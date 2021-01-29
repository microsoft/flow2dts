import { OverridesVisitor } from "../../../packages/flow2dts/src/transform/applyOverridesVisitors"
import { types as t } from "@babel/core"
import template from "@babel/template"

const ast = template({
  plugins: ["typescript"],
}).ast

const visitors: OverridesVisitor[] = [
  // TODO: This should be fixed upstream in RN. This seems like simply broken upstream code.
  [
    "Libraries/Components/SegmentedControlIOS/SegmentedControlIOS.ios.d.ts",
    {
      TSTypeReference: {
        exit(path) {
          if (t.isIdentifier(path.node.typeName) && path.node.typeName.name === "NativeSegmentedControlIOS") {
            const typeAlias = ast`
            type Replacement = typeof import("./RCTSegmentedControlNativeComponent").default
          ` as t.TSTypeAliasDeclaration
            path.replaceWith(typeAlias.typeAnnotation)
            path.skip()
          }
        },
      },
    },
  ],
]

export default visitors
