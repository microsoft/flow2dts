// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { assertTSType, isClassIdentifier, nameForExportDefault, nameForImportTypeof } from "../utilities"

function generateIntermediateLocalIdentifier(id: t.Identifier) {
  return t.identifier(`$f2d_${id.name}`)
}

export const exportVisitor: Visitor<State> = {
  DeclareModuleExports: {
    exit(path, state) {
      const typeAnnotation = path.node.typeAnnotation.typeAnnotation as any
      assertTSType(typeAnnotation)

      if (
        t.isTSTypeQuery(typeAnnotation) &&
        t.isIdentifier(typeAnnotation.exprName) &&
        isClassIdentifier(typeAnnotation.exprName, path.scope)
      ) {
        path.replaceWith(t.exportDefaultDeclaration(typeAnnotation.exprName))
      } else {
        // Export each value separately as ES6 named exports
        const intermediateLocalVars: t.Identifier[] = []
        const exportSpecifiers: t.ExportSpecifier[] = []
        const typeLiterals = t.isTSTypeLiteral(typeAnnotation)
          ? [typeAnnotation]
          : t.isTSIntersectionType(typeAnnotation)
          ? (typeAnnotation.types.filter((x) => t.isTSTypeLiteral(x)) as t.TSTypeLiteral[])
          : []
        typeLiterals.forEach((typeLiteral) => {
          typeLiteral.members.forEach((property) => {
            t.assertTSPropertySignature(property)
            t.assertIdentifier(property.key)
            t.assertTSTypeAnnotation(property.typeAnnotation)
            const propertyTypeAnnotation = property.typeAnnotation.typeAnnotation
            let intermediateLocalVar: t.Identifier | null = null
            let exportSpecifier: t.ExportSpecifier | null = null
            if (t.isTSTypeQuery(propertyTypeAnnotation)) {
              t.assertTSEntityName(propertyTypeAnnotation.exprName)
              if (t.isIdentifier(propertyTypeAnnotation.exprName)) {
                const binding = path.scope.getBinding(propertyTypeAnnotation.exprName.name)
                if (binding) {
                  if (
                    binding.path.isTSDeclareFunction() ||
                    binding.path.isDeclareVariable() ||
                    binding.path.isDeclareClass()
                  ) {
                    exportSpecifier = t.exportSpecifier(propertyTypeAnnotation.exprName, property.key)
                  }
                }
              }
            } else if (t.isTSTypeReference(propertyTypeAnnotation) && t.isIdentifier(propertyTypeAnnotation.typeName)) {
              const binding = path.scope.getBinding(propertyTypeAnnotation.typeName.name)
              if (
                binding &&
                (binding.path.isImportDefaultSpecifier() || binding.path.isImportSpecifier()) &&
                binding.path.node.local.name === nameForImportTypeof(propertyTypeAnnotation.typeName.name)
              ) {
                exportSpecifier = t.exportSpecifier(
                  // Instead of export { AccessibilityInfo$f2tTypeof as AccessibilityInfo }
                  // we may need export { AccessibilityInfo }
                  // to export it as a type, since later it is also exported as a value of this type
                  // t.identifier(nameForImportTypeof(propertyTypeAnnotation.typeName.name)),
                  property.key,
                  property.key
                )
              }
            }
            if (exportSpecifier === null) {
              intermediateLocalVar = generateIntermediateLocalIdentifier(property.key)
              intermediateLocalVar.typeAnnotation = t.tsTypeAnnotation(propertyTypeAnnotation)
              exportSpecifier = t.exportSpecifier(intermediateLocalVar, property.key)
            }
            if (intermediateLocalVar) {
              const duplicateLocalVar = intermediateLocalVars.find(
                (x) => x.name === (intermediateLocalVar as t.Identifier).name
              )
              if (duplicateLocalVar) {
                if (!t.isNodesEquivalent(intermediateLocalVar, duplicateLocalVar)) {
                  throw path.buildCodeFrameError(`Duplicate identifier with different typing encountered`)
                }
              }
              intermediateLocalVars.push(intermediateLocalVar)
            }
            exportSpecifiers.push(exportSpecifier)
          })
        })
        intermediateLocalVars.forEach((valueIdentifier) => {
          path.insertBefore(t.variableDeclaration("const", [t.variableDeclarator(valueIdentifier)]))
        })
        if (exportSpecifiers.length > 0) {
          path.insertBefore(t.exportNamedDeclaration(undefined, exportSpecifiers))
        }
        // Export the entire object as the ES6 default export
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
          throw path.buildCodeFrameError(
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
