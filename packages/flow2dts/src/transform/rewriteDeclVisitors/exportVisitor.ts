import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { assertTSType, nameForExportDefault, nameForExportDefaultRedirect, nameForHidden } from "../utilities"

function convertToNamespace(decl: t.TSType): [string, t.TSTypeReference][] | undefined {
  if (decl.type !== "TSTypeLiteral") return undefined
  for (const prop of decl.members) {
    if (prop.type !== "TSPropertySignature") return undefined
    if (prop.key.type !== "Identifier") return undefined
    const propType = prop.typeAnnotation?.typeAnnotation
    if (!propType) return undefined
    if (propType.type !== "TSTypeReference") return undefined
    if (propType.typeName.type !== "Identifier") return undefined
    if (propType.typeName.name !== "$TypeOf") return undefined
  }

  return decl.members.map((prop) => {
    const propId = <t.Identifier>(<t.TSPropertySignature>prop).key
    const propType = <t.TSTypeReference>(<t.TSPropertySignature>prop).typeAnnotation?.typeAnnotation
    return [propId.name, propType]
  })
}

function makeRedirection(name: string): t.TSTypeAnnotation {
  return t.tsTypeAnnotation(
    t.tsTypeReference(
      t.identifier("$TypeOf"),
      t.tsTypeParameterInstantiation([
        t.tsTypeReference(
          t.tsQualifiedName(t.identifier(nameForExportDefaultRedirect), t.identifier(nameForHidden(name)))
        ),
      ])
    )
  )
}

export const exportVisitor: Visitor<State> = {
  DeclareModuleExports: {
    exit(path) {
      const typeAnnotation = path.node.typeAnnotation.typeAnnotation
      assertTSType(typeAnnotation)

      const nss = convertToNamespace(typeAnnotation)
      if (nss) {
        const statRedirect: t.Statement[] = []
        const statDefault: t.Statement[] = []

        for (const [name, tsType] of nss) {
          const varHidden = t.identifier(nameForHidden(name))
          varHidden.typeAnnotation = t.tsTypeAnnotation(tsType)
          const exportHidden = t.exportNamedDeclaration(
            t.variableDeclaration("const", [t.variableDeclarator(varHidden)])
          )

          const varField = t.identifier(name)
          varField.typeAnnotation = makeRedirection(name)
          const exportField = t.exportNamedDeclaration(t.variableDeclaration("const", [t.variableDeclarator(varField)]))

          const varType = t.identifier(name)
          varType.typeAnnotation = makeRedirection(name)
          const exportType = t.exportNamedDeclaration(t.variableDeclaration("const", [t.variableDeclarator(varType)]))

          statRedirect.push(exportHidden)
          statDefault.push(exportField)
          // statDefault.push(exportType)
        }

        const nssRedirect = t.tsModuleDeclaration(
          t.identifier(nameForExportDefaultRedirect),
          t.tsModuleBlock(statRedirect)
        )
        nssRedirect.declare = true
        const nssDefault = t.tsModuleDeclaration(t.identifier(nameForExportDefault), t.tsModuleBlock(statDefault))
        nssDefault.declare = true

        path.replaceWithMultiple([
          nssRedirect,
          nssDefault,
          t.exportDefaultDeclaration(t.identifier(nameForExportDefault)),
        ])
      } else {
        const id = t.identifier(nameForExportDefault)
        id.typeAnnotation = t.tsTypeAnnotation(typeAnnotation)
        path.replaceWithMultiple([
          t.variableDeclaration("const", [t.variableDeclarator(id)]),
          t.exportDefaultDeclaration(id),
        ])
      }
    },
  },
  ExportDefaultDeclaration: {
    exit(path) {
      const decl = path.node.declaration
      switch (decl.type) {
        case "Identifier": {
          // nothing to do
          break
        }
        case "TypeCastExpression": {
          const tsType = decl.typeAnnotation.typeAnnotation
          assertTSType(tsType)

          const varId = t.identifier(nameForExportDefault)
          varId.typeAnnotation = t.tsTypeAnnotation(tsType)
          const varDecl = t.variableDeclaration("const", [t.variableDeclarator(varId)])
          varDecl.declare = true

          path.node.declaration = t.identifier(nameForExportDefault)
          path.replaceWithMultiple([varDecl, path.node])
          break
        }
        default:
          throw new Error(
            `Only identifiers and type cast expressions are allowed in export default:\r\n${JSON.stringify(
              decl,
              undefined,
              4
            )}`
          )
      }
    },
  },
  DeclareExportDeclaration: {
    exit(path) {
      const decl = path.node.declaration as any
      if (t.isTSType(decl) && !t.isIdentifier(decl)) {
        const varId = t.identifier(nameForExportDefault)
        varId.typeAnnotation = t.tsTypeAnnotation(decl)
        const varDecl = t.variableDeclaration("const", [t.variableDeclarator(varId)])
        varDecl.declare = true
        path.replaceWithMultiple([varDecl, t.exportDefaultDeclaration(t.identifier(nameForExportDefault))])
      }
    },
  },
}
