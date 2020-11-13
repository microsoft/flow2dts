import { Visitor, types as t } from "@babel/core"
import { type } from "os"
import { isRecognized, State } from "../state"
import { assertTSType } from "../utilities"
import { isRequireDeclaration, resolveQualifiedTypeIdentifier, resolveMemberExpression } from "../typeReferenceResolver"

export const declarationVisitor: Visitor<State> = {
  VariableDeclaration: {
    exit(path, state) {
      const decl = path.node.declarations[0]
      const requireDecl = isRequireDeclaration(decl)
      if (requireDecl) {
        const [name, pack] = requireDecl
        path.replaceWith(t.importDeclaration([t.importDefaultSpecifier(t.identifier(name))], pack))
        return
      }

      path.node.declare = true
      path.node.declarations.forEach((d) => {
        d.init = null
      })
    },
  },
  DeclareVariable: {
    exit(path, state) {
      if (isRecognized(state.typeReferences, path.node)) {
        path.replaceWithMultiple([])
      }
    },
  },
  // TODO: ClassPrivateProperty needs to be converted to ClassProperty with `accessibility = private`
  ClassProperty: {
    exit(path) {
      path.node.value = null
      if (path.node.static) {
        const node = path.node
        if (t.isTypeAnnotation(node.typeAnnotation)) {
          const typeAnnotation = node.typeAnnotation.typeAnnotation as any
          assertTSType(typeAnnotation)
          if (t.isTSTypeReference(typeAnnotation)) {
            path.node.typeAnnotation = t.tsTypeAnnotation(t.tsUnknownKeyword())
            t.assertIdentifier(typeAnnotation.typeName)
            t.addComment(
              path.node.typeAnnotation,
              "leading",
              `[FLOW2DTS - Warning] This was typed using the \`${typeAnnotation.typeName.name}\` type parameter`
            )
          }
        }
      }
    },
  },
  ClassImplements: {
    exit(path, state) {
      const { id, typeParameters } = path.node
      const superClass = resolveMemberExpression(state.typeReferences, path, id)
      if (superClass) {
        // it should be TSClassImplements, but the type is missing, so just hack it for now
        path.node.id = <t.Identifier>superClass
      }
    },
  },
  InterfaceExtends: {
    exit(path, state) {
      const resolved = resolveQualifiedTypeIdentifier(state.typeReferences, path, path.node.id)
      if (resolved) {
        // it should be TSInterfaceHeritage, but the type is missing, so just hack it for now
        path.node.id = <t.Identifier>resolved
      }
    },
  },
  InterfaceDeclaration: {
    exit(path, state) {
      let _extends: t.TSExpressionWithTypeArguments[] | null = null
      if (path.node.extends && path.node.extends.length > 0) {
        _extends = path.node.extends.map((e) => {
          t.assertTSEntityName(e.id)
          t.assertInterfaceExtends(e)
          const eTypeParameters = e.typeParameters as t.Node | null
          if (eTypeParameters) {
            t.assertTSTypeParameterInstantiation(eTypeParameters)
          }
          return t.tsExpressionWithTypeArguments(e.id, eTypeParameters)
        })
      }

      const typeParameters = path.node.typeParameters as t.Node | null
      if (typeParameters) {
        t.assertTSTypeParameterDeclaration(typeParameters)
      }

      const body = path.node.body as any
      t.assertTSTypeLiteral(body)

      path.replaceWith(
        t.tsInterfaceDeclaration(path.node.id, typeParameters, _extends, t.tsInterfaceBody(body.members))
      )
    },
  },
  ClassDeclaration: {
    exit(path, state) {
      path.node.declare = true

      if (path.node.superClass) {
        const superClass = resolveMemberExpression(state.typeReferences, path, path.node.superClass)
        if (superClass) {
          path.node.superClass = superClass
        }
      }

      if (path.node.superTypeParameters && path.node.superTypeParameters.type === "TypeParameterInstantiation") {
        path.node.superTypeParameters = t.tsTypeParameterInstantiation(
          <t.TSType[]>(<unknown>path.node.superTypeParameters.params)
        )
      }
    },
  },
}
