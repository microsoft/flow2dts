import { Visitor, types as t } from "@babel/core"
import { type } from "os"
import { State } from "../state"
import { assertTSType } from "../utilities"

export const declarationVisitor: Visitor<State> = {
  VariableDeclaration: {
    exit(path) {
      const decl = path.node.declarations[0]
      if (decl.id.type === "Identifier" && decl && decl.init && decl.init.type === "CallExpression" && decl.init) {
        const callee = decl.init.callee
        if (callee.type === "Identifier" && callee.name === "require" && decl.init.arguments.length === 1) {
          path.replaceWith(
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(decl.id.name))],
              <t.StringLiteral>decl.init.arguments[0]
            )
          )
          return
        }
      }
      path.node.declare = true
      path.node.declarations.forEach((d) => {
        d.init = null
      })
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
  ClassDeclaration: {
    exit(path) {
      path.node.declare = true
    },
  },
}
