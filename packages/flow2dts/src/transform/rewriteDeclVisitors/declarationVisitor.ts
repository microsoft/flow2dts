import { Visitor, types as t } from "@babel/core"
import { State } from "../state"

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
  ClassProperty: {
    exit(path) {
      path.node.value = null
    },
  },
  ClassDeclaration: {
    exit(path) {
      path.node.declare = true
    },
  },
}
