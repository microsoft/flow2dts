import { PluginObj, types as t } from "@babel/core"

import { State } from "./state"
import { primitiveTypeVisitor } from "./primitiveTypeVisitor"
import { advancedTypeVisitor } from "./advancedTypeVisitor"
import { objectTypeVisitor } from "./objectTypeVisitor"
import { declarationVisitor } from "./declarationVisitor"
import { importVisitor } from "./importVisitor"
import { typeOperatorVisitor } from "./typeOperatorVisitor"
import { exportVisitor } from "./exportVisitor"

export function transform(): PluginObj<State> {
  return {
    name: "flow2dtsTransform",
    visitor: {
      Program: {
        enter(_path, state) {
          state.polyfillFlowTypes = new Set()
        },
        exit(path, state) {
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
      ...primitiveTypeVisitor,
      ...advancedTypeVisitor,
      ...objectTypeVisitor,
      ...declarationVisitor,
      ...importVisitor,
      ...typeOperatorVisitor,
      ...exportVisitor,
    },
  }
}
