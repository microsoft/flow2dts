import { OverridesVisitor } from "../../../packages/flow2dts/src/transform/applyOverridesVisitors"
import { types as t } from "@babel/core"
import template from "@babel/template"

const ast = template({
  plugins: ["typescript"],
}).ast

const visitors: OverridesVisitor[] = [
  [
    "Libraries/Components/AccessibilityInfo/AccessibilityInfo.ios.d.ts",
    {
      ImportDeclaration: {
        exit(path, state: { promiseIdentifierName?: string }) {
          if (path.node.source.value === "../../Promise") {
            const specifier = path.node.specifiers[0]
            t.assertImportDefaultSpecifier(specifier)
            state.promiseIdentifierName = specifier.local.name
            path.remove()
          }
        },
      },
      TSTypeReference: {
        exit(path, state: { promiseIdentifierName: string }) {
          if (t.isIdentifier(path.node.typeName) && path.node.typeName.name === state.promiseIdentifierName) {
            path.node.typeName = t.identifier("Promise")
          }
        },
      },
    },
  ],
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
