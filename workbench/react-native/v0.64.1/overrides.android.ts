import { OverridesVisitor } from "../../../packages/flow2dts/src/transform/applyOverridesVisitors"
import { types as t } from "@babel/core"
import template from "@babel/template"

const ast = template({
  plugins: ["typescript"],
}).ast

const exportsToRemove: string[] = [
  "AccessibilityInfo",
  "CheckBox",
  "DatePickerIOS",
  "Image",
  "MaskedViewIOS",
  "PickerIOS",
  "ProgressViewIOS",
  "SegmentedControlIOS",
  "BackHandler",
  "DatePickerAndroid",
  "Networking",
  "Settings",
  "Platform",
  "PlatformColor",
]

const visitors: OverridesVisitor[] = [
  [
    "index.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          if (path.node.specifiers.length === 1) {
            const name = path.node.specifiers[0].local.name
            if (name.endsWith("$f2tTypeof") && exportsToRemove.indexOf(name.substr(0, name.length - 10)) !== -1) {
              path.remove()
            }
          }
        },
      },
      ExportSpecifier: {
        exit(path) {
          if (path.node.exported.type === "Identifier" && exportsToRemove.indexOf(path.node.exported.name) !== -1) {
            path.remove()
          }
        },
      },
      TSTypeAliasDeclaration: {
        exit(path) {
          if (exportsToRemove.indexOf(path.node.id.name) !== -1) {
            path.remove()
          }
        },
      },
      TSPropertySignature: {
        exit(path) {
          if (path.node.key.type === "Identifier" && exportsToRemove.indexOf(path.node.key.name) !== -1) {
            path.remove()
          }
        },
      },
    },
  ],
  // TODO: NativeColorValue is missing because of Libraries/StyleSheet/PlatformColorValueTypes.ios.js.flow
  [
    "Libraries/StyleSheet/StyleSheet.d.ts", {
      Program: {
        exit(path) {
          path.pushContainer("body", ast`export { ColorValue } from "./StyleSheetTypes"` as t.Statement[])
        },
      },
    }
  ],
  [
    "Libraries/StyleSheet/processColor.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          if (path.node.source.value === "./PlatformColorValueTypes") {
            path.remove()
          }
        }
      },
      TSTypeReference: {
        exit(path) {
          if (path.node.typeName.type === "Identifier" && path.node.typeName.name === "NativeColorValue") {
            path.remove()
          }
        }
      },
    }
  ],
  [
    "Libraries/StyleSheet/StyleSheetTypes.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          if (path.node.source.value === "./PlatformColorValueTypes") {
            path.remove()
          }
        }
      },
      TSTypeReference: {
        exit(path) {
          if (path.node.typeName.type === "Identifier" && path.node.typeName.name === "NativeColorValue") {
            path.remove()
          }
        }
      },
    }
  ],
]

export default visitors
