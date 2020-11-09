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
          /*
           import * as React from "react"
           declare class AccessibilityManagerTest extends $1<{ ... }> {}
           declare var $1: typeof React.Component

           In this example,
           everything looks like $1 will eventually be removed,
           and $1 is replaced to React.Component in all occurrences.
           
           In order to keep these variables exist before handling all types,
           it is necessary to keep types and declarations in two different visitors.
           */
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
