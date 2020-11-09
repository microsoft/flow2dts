import { PluginObj, types as t } from "@babel/core"
import { State } from "./state"
import { rewriteTypeVisitor } from "./rewriteTypeVisitors"
import { rewriteDeclVisitor } from "./rewriteDeclVisitors"

export function transform(): PluginObj<State> {
  return {
    name: "flow2dtsTransform",
    visitor: {
      Program: {
        enter(_path, state) {
          state.polyfillFlowTypes = new Set()
        },
        exit(path, state) {
          path.traverse(rewriteTypeVisitor, state)
          path.traverse(rewriteDeclVisitor, state)

          if (state.polyfillFlowTypes.size > 0) {
            path.node.body.unshift(
              t.importDeclaration(
                Array.from(state.polyfillFlowTypes).map((typeName) =>
                  t.importSpecifier(t.identifier(typeName), t.identifier(typeName))
                ),
                t.stringLiteral("flow2dts-flow-types-polyfill")
              )
            )
          }
        },
      },
    },
  }
}
