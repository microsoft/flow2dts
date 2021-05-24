import { OverridesVisitor } from "../../../packages/flow2dts/src/transform/applyOverridesVisitors"
import { types as t } from "@babel/core"
import template from "@babel/template"

const ast = template({
  plugins: ["typescript"],
}).ast

const visitors: OverridesVisitor[] = [
  // TODO: This should be fixed upstream in RN. This seems like simply broken upstream code.
  [
    "index.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          switch (path.node.source.value) {
            case "./Libraries/Components/DrawerAndroid/DrawerLayoutAndroid":
            case "./Libraries/Components/ProgressBarAndroid/ProgressBarAndroid": {
              path.remove()
              break
            }
          }
        },
      },
      TSTypeAliasDeclaration: {
        exit(path) {
          if (path.node.id.type === "Identifier") {
            switch (path.node.id.name) {
              case "DrawerLayoutAndroid":
              case "ProgressBarAndroid": {
                path.remove()
                break
              }
            }
          }
        },
      },
      TSPropertySignature: {
        exit(path) {
          if (path.node.key.type === "Identifier") {
            switch (path.node.key.name) {
              case "DrawerLayoutAndroid":
              case "ProgressBarAndroid": {
                path.remove()
                break
              }
            }
          }
        },
      },
      ExportSpecifier: {
        exit(path) {
          if (path.node.exported.type === "Identifier") {
            switch (path.node.exported.name) {
              case "DrawerLayoutAndroid":
              case "ProgressBarAndroid": {
                path.remove()
                break
              }
            }
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
