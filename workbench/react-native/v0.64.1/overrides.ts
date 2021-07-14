import { OverridesVisitor } from "../../../packages/flow2dts/src/transform/applyOverridesVisitors"
import template from "@babel/template"
import { types as t } from "@babel/core"
import { NodePath, Scope, Visitor } from "@babel/traverse"

const ast = template({
  plugins: ["typescript"],
}).ast

function isReactImportSpecifier(scope: Scope, id: t.Identifier) {
  const declarationPath = scope.getBinding(id.name)!.path
  if (t.isImportDeclaration(declarationPath.parent)) {
    if (declarationPath.parent.source.value === "react") {
      return true
    }
  }
  return false
}

/**
 * Flow code tends to use `void` as the type of the `state` instance property,
 * however the React DT typings do not allow that. In reality React sets it to
 * `null` at runtime, but the DT typings of React don't allow that either, it
 * defaults to `{}` istead. So here we simply replace `void` with `{}`.
 *
 * TODO: Currently only handling PureComponent
 */
function noVoidForReactComponentState(path: NodePath<t.DeclareClass>) {
  const superclass = path.node.extends![0]
  if (superclass) {
    const id = superclass.id as any
    const typeParameters = superclass.typeParameters as any
    if (
      t.isTSQualifiedName(id) &&
      t.isIdentifier(id.left) &&
      isReactImportSpecifier(path.scope, id.left) &&
      t.isTSTypeParameterInstantiation(typeParameters)
    ) {
      if (id.right.name === "PureComponent") {
        const stateType = typeParameters.params[1]
        if (t.isTSVoidKeyword(stateType)) {
          // TODO: In reality this is `null`, but DT React types default to `{}`
          typeParameters.params[1] = t.tsTypeLiteral([])
        }
      }
    }
  }
}

// `HostComponent<unknown>` does not satisfy some of the React DT typings, so change it to `HostComponent<{}>`.
// TODO: Unsure if this should ideally still be `unknown`.
function removeUnknownFromHostComponent(path: NodePath<t.TSTypeReference>) {
  const id = path.node.typeName
  if (
    t.isIdentifier(id) &&
    id.name === "HostComponent" &&
    t.isTSTypeParameterInstantiation(path.node.typeParameters) &&
    t.isTSUnknownKeyword(path.node.typeParameters.params[0])
  ) {
    path.node.typeParameters.params[0] = t.tsTypeLiteral([])
  }
}

const animatedVisitors: OverridesVisitor[] = [
  // Override exported components with those taken from DT
  [
    "Libraries/Animated/Animated.d.ts",
    {
      Program: {
        exit(path) {
          const exportDeclaration = ast`
            export * from "../../TypeScriptSupplementals/Animated"
          ` as t.ExportDeclaration
          path.unshiftContainer("body", [exportDeclaration])
        },
      },
    },
  ],
  // Export all of the AnimatedMock ES6 exports, so those and the ES6 exports of Animated can be...
  [
    "Libraries/Animated/Animated.d.ts",
    {
      Program: {
        exit(path) {
          const exportDeclaration = ast`
            export * from "./AnimatedMock"
          ` as t.ExportDeclaration
          path.unshiftContainer("body", [exportDeclaration])
        },
      },
    },
  ],
  // ...imported as a namespace
  [
    "index.d.ts",
    {
      ImportDefaultSpecifier: {
        exit(path) {
          if (path.node.local.name === "Animated$f2tTypeof") {
            path.replaceWith(t.importNamespaceSpecifier(path.node.local))
          }
        },
      },
    },
  ],
  [
    "Libraries/Animated/AnimatedImplementation.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          if (path.node.source.value === "./AnimatedEvent") {
            path.node.specifiers = path.node.specifiers.map((specifier) =>
              t.isImportDefaultSpecifier(specifier) ? t.importNamespaceSpecifier(specifier.local) : specifier
            )
          }
        },
      },
    },
  ],
]

const listsVisitor: Visitor = {
  TSTypeAliasDeclaration: {
    exit(path) {
      if (path.node.id.name === "Props") {
        path.node.typeParameters!.params[0]!.constraint = t.tsTypeReference(
          t.identifier("SectionBase"),
          t.tsTypeParameterInstantiation([t.tsAnyKeyword()])
        )
        path.skip()
      }
    },
  },
}

const listsVisitors: OverridesVisitor[] = [
  ["Libraries/Lists/SectionList.d.ts", listsVisitor],
  ["Libraries/Lists/VirtualizedSectionList.d.ts", listsVisitor],
]

const logboxVisitor: Visitor = {
  TSTypeReference: {
    exit(path) {
      if (t.isIdentifier(path.node.typeName)) {
        if (path.node.typeName.name === "LogBoxLog") {
          path.replaceWith(t.tsTypeQuery(t.identifier("LogBoxLog")))
          path.skip()
        }
      }
    },
  },
}

const logboxVisitors: OverridesVisitor[] = [
  ["Libraries/LogBox/LogBoxInspectorContainer.d.ts", logboxVisitor],
  ["Libraries/LogBox/UI/LogBoxInspectorReactFrames.d.ts", logboxVisitor],
  ["Libraries/LogBox/UI/LogBoxInspectorStackFrames.d.ts", logboxVisitor],
]

const missingFileVisitors: OverridesVisitor[] = [
  // TODO: This should be fixed upstream in RN. This seems like simply broken upstream code.
  [
    "**/*",
    {
      ImportDeclaration: {
        exit(path) {
          switch (path.node.source.value) {
            case "./DeprecatedColorPropType": {
              path.node.source.value = "../../TypeScriptSupplementals/DeprecatedColorPropType"
              break
            }
            case "./DeprecatedImageSourcePropType": {
              path.node.source.value = "../../TypeScriptSupplementals/DeprecatedImageSourcePropType"
              break
            }
            case "../../Utilities/differ/sizesDiffer": {
              path.node.source.value = "../../../TypeScriptSupplementals/sizesDiffer"
              break
            }
          }
        },
      },
    },
  ],
  [
    "index.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          switch (path.node.source.value) {
            case "./Libraries/DeprecatedPropTypes/DeprecatedColorPropType": {
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
              case "DeprecatedColorPropType": {
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
              case "ColorPropType": {
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
              case "ColorPropType": {
                path.remove()
                break
              }
            }
          }
        },
      },
      ExportNamedDeclaration: {
        exit(path) {
          if (path.node.declaration && path.node.declaration.type === "TSTypeAliasDeclaration") {
            switch (path.node.declaration.id.name) {
              case "ColorPropType": {
                path.remove()
                break
              }
            }
          }
        },
      },
    },
  ],
]

const fixingEventEmitterVisitors: OverridesVisitor[] = [
  // TODO: This should be fixed upstream in RN. This seems like simply broken upstream code.
  [
    "Libraries/AppState/AppState.d.ts",
    {
      TSDeclareMethod: {
        exit(path) {
          if (path.node.key.type === "Identifier") {
            switch (path.node.key.name) {
              case "addListener":
              case "removeAllListeners":
              case "removeSubscription": {
                if (path.node.params.length === 0) {
                  path.remove()
                }
                break
              }
            }
          }
        },
      },
    },
  ],
  [
    "Libraries/vendor/emitter/_EventEmitter.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          switch (path.node.source.value) {
            case "./_EmitterSubscription": {
              const interfaceDecl = ast`
              interface EmitterSubscription {
                remove: () => void;
              }` as t.TSInterfaceDeclaration
              path.replaceWith(interfaceDecl)
              break
            }
          }
        },
      },
    },
  ],
  [
    "Libraries/vendor/emitter/_EmitterSubscription.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          switch (path.node.source.value) {
            case "./EventEmitter": {
              path.node.source.value = "./_EventEmitter"
              break
            }
          }
        },
      },
    },
  ],
]

const visitors: OverridesVisitor[] = [
  ...animatedVisitors,
  ...listsVisitors,
  ...logboxVisitors,
  ...missingFileVisitors,
  ...fixingEventEmitterVisitors,
  [
    "**/*",
    {
      // TODO: We should convert DeclareClass, which is a Flow type, to ClassDeclaration.
      DeclareClass: {
        exit(path) {
          noVoidForReactComponentState(path)
        },
      },
    },
  ],
  [
    "**/*",
    {
      TSTypeReference: {
        exit(path) {
          removeUnknownFromHostComponent(path)
        },
      },
    },
  ],
  [
    "**/*",
    {
      // Remove all propTypes typings. They are hard to get right, don't add any value to type-consumers, and are deprecated to boot.
      TSPropertySignature: {
        exit(path) {
          if (t.isIdentifier(path.node.key) && path.node.key.name === "propTypes") {
            path.remove()
          }
        },
      },
    },
  ],
  [
    "index.d.ts",
    {
      Program: {
        exit(path) {
          // These deprecated DT types are defined in a separate file for ease of external contribution.
          path.pushContainer("body", ast`export * from "./TypeScriptSupplementals"` as t.Statement[])
        },
      },
    },
  ],
  // Fixing due to semantic differences between Flow and TypeScript
  [
    "Libraries/Components/ScrollView/ScrollViewStickyHeader.d.ts",
    {
      TSTypeReference: {
        exit(path) {
          if (path.node.typeName.type === "TSQualifiedName" && path.node.typeName.left.type === "Identifier") {
            const valueName = path.node.typeName.left.name
            const fieldName = path.node.typeName.right.name
            if (valueName === "AnimatedImplementation" && (fieldName === "Value" || fieldName === "Interpolation")) {
              path.replaceWith(
                t.tsIndexedAccessType(
                  t.tsTypeQuery(t.identifier(valueName)),
                  t.tsLiteralType(t.stringLiteral(fieldName))
                )
              )
            }
          }
        },
      },
    },
  ],
  // This happens due to removing propTypes in Text.d.ts, so we resolve it manually
  [
    "Libraries/DeprecatedPropTypes/DeprecatedTextInputPropTypes.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          if (path.node.source.value === "flow2dts-flow-types-polyfill") {
            path.node.specifiers.push(
              t.importSpecifier(t.identifier("ReactPropsCheckType"), t.identifier("ReactPropsCheckType"))
            )
          }
        },
      },
      TSTypeQuery: {
        exit(path) {
          if (path.node.exprName.type === "TSQualifiedName" && path.node.exprName.left.type === "TSQualifiedName") {
            if (path.node.exprName.right.name === "style" && path.node.exprName.left.right.name === "propTypes") {
              path.replaceWith(t.tsTypeReference(t.identifier("ReactPropsCheckType")))
            }
          }
        },
      },
    },
  ],
  // TODO: This could probably move upstream, as `Element` is slightly more restrictive than `Node`.
  [
    "Libraries/Components/TextInput/TextInput.d.ts",
    {
      TSDeclareFunction: {
        exit(path) {
          if (t.isIdentifier(path.node.id) && path.node.id.name === "InternalTextInput") {
            const returnType = path.node.returnType
            t.assertTSTypeAnnotation(returnType)
            t.assertTSTypeReference(returnType.typeAnnotation)
            const typeAnnotation = returnType.typeAnnotation
            t.assertTSQualifiedName(typeAnnotation.typeName)
            typeAnnotation.typeName.right = t.identifier("Element")
            typeAnnotation.typeParameters = t.tsTypeParameterInstantiation([t.tsTypeReference(t.identifier("Props"))])
          }
        },
      },
    },
  ],
  [
    "Libraries/Components/TextInput/TextInputNativeCommands.d.ts",
    {
      TSInterfaceDeclaration: {
        exit(path) {
          if (path.node.id.name === "TextInputNativeCommands") {
            const replacementDeclaration = ast`
            interface TextInputNativeCommands<
              T extends
                | React.ForwardRefExoticComponent<any>
                | { new (props: any): React.Component<any> }
                | ((props: any, context?: any) => React.ReactElement | null)
                | keyof JSX.IntrinsicElements
            > {}
          ` as t.TSInterfaceDeclaration
            replacementDeclaration.body = path.node.body
            path.replaceWith(replacementDeclaration)
            path.skip()
          }
        },
      },
    },
  ],
  [
    "Libraries/Performance/PureComponentDebug.d.ts",
    {
      // TODO: We should convert DeclareClass, which is a Flow type, to ClassDeclaration.
      DeclareClass: {
        exit(path) {
          if (path.node.id.name === "PureComponentDebug") {
            const typeParameters = path.node.typeParameters as any
            t.assertTSTypeParameterDeclaration(typeParameters)
            typeParameters.params.find((param) => param.name === "S")!.default = t.tsUndefinedKeyword()
            path.skip()
          }
        },
      },
    },
  ],
  [
    "Libraries/Interaction/PanResponder.d.ts",
    {
      TSTypeAliasDeclaration: {
        exit(path) {
          if (path.node.id.name === "PanResponderInstance") {
            // TS can't support the type of type mapping that $Call does, so convert it manually.
            const replacementDeclaration = ast`
              declare type PanResponderInstance = ReturnType<typeof PanResponder["create"]>
            ` as t.TSTypeAliasDeclaration
            path.replaceWith(replacementDeclaration)
            path.skip()
          }
        },
      },
    },
  ],
  // TODO: This should be fixed upstream in RN. This seems like simply broken upstream code.
  [
    "Libraries/Utilities/ReactNativeTestTools.d.ts",
    {
      TSTypeAliasDeclaration: {
        exit(path) {
          switch (path.node.id.name) {
            case "$ReturnType": {
              const replacementDeclaration = ast`
              declare type $ReturnType<Fn extends (...args: any) => any> = ReturnType<Fn>
            ` as t.TSTypeAliasDeclaration
              path.replaceWith(replacementDeclaration)
              path.skip()
              break
            }
            case "ReactTestRendererJSON": {
              const replacementDeclaration = ast`
              declare type ReactTestRendererJSON =
                $ReturnType<
                  $ReturnType<
                    typeof import("react-test-renderer")["create"]
                  >["toJSON"]
                >
            ` as t.TSTypeAliasDeclaration
              path.replaceWith(replacementDeclaration)
              path.skip()
              break
            }
          }
        },
      },
    },
  ],
  // TODO: This should be fixed upstream in RN. No duplicate prop entries should exist.
  [
    "Libraries/Text/TextProps.d.ts",
    {
      Program: {
        enter(_, state: any) {
          state.seen_adjustsFontSizeToFit_times = 0
        },
      },
      TSPropertySignature: {
        exit(path, state: any) {
          if (t.isIdentifier(path.node.key) && path.node.key.name === "adjustsFontSizeToFit") {
            state.seen_adjustsFontSizeToFit_times += 1
            if (state.seen_adjustsFontSizeToFit_times === 2) {
              path.remove()
            }
          }
        },
      },
    },
  ],
  [
    "Libraries/Components/Pressable/useAndroidRippleForView.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          if (path.node.source.value === "../../..") {
            if (path.node.specifiers.length !== 1 || path.node.specifiers[0].local.name !== "View") {
              throw path.buildCodeFrameError("Expected a single `View` import specificier")
            }
            const replacementDeclaration = ast`
            import View from "../../Components/View/View"
          ` as t.ImportDeclaration
            path.replaceWith(replacementDeclaration)
            path.skip()
          }
        },
      },
    },
  ],
  [
    "Libraries/Components/Touchable/TouchableBounce.d.ts",
    {
      ImportDeclaration: {
        exit(path) {
          if (path.node.source.value === "../../..") {
            if (path.node.specifiers.length !== 1 || path.node.specifiers[0].local.name !== "Animated") {
              throw path.buildCodeFrameError("Expected a single `Animated` import specificier")
            }
            const replacementDeclaration = ast`
            import * as Animated from "../../Animated/Animated"
          ` as t.ImportDeclaration
            path.replaceWith(replacementDeclaration)
            path.skip()
          }
        },
      },
    },
  ],
  [
    "Libraries/Components/Picker/Picker.d.ts",
    {
      DeclareClass: {
        exit(path) {
          if (path.node.id.name === "PickerItem") {
            const body = path.node.body as any
            t.assertClassBody(body)
            const renderMethod = body.body.find(
              (m) => t.isTSDeclareMethod(m) && t.isIdentifier(m.key) && m.key.name === "render"
            )
            t.assertTSDeclareMethod(renderMethod)
            t.assertTSTypeAnnotation(renderMethod.returnType)
            t.assertTSVoidKeyword(renderMethod.returnType.typeAnnotation)
            renderMethod.returnType.typeAnnotation = t.tsNeverKeyword()
          }
        },
      },
    },
  ],
  // TODO: These should all be optional upstream
  [
    "Libraries/Lists/FlatList.d.ts",
    {
      TSTypeAliasDeclaration: {
        exit(path) {
          if (path.node.id.name === "OptionalProps") {
            const typeLiteral = path.node.typeAnnotation
            t.assertTSTypeLiteral(typeLiteral)
            typeLiteral.members.forEach((propertySignature) => {
              t.assertTSPropertySignature(propertySignature)
              propertySignature.optional = true
            })
          }
        },
      },
    },
  ],
  // TODO: These should be typed as such upstream
  [
    "Libraries/Utilities/Dimensions.d.ts",
    {
      Program: {
        exit(path) {
          path.unshiftContainer(
            "body",
            ast`
            import type { DisplayMetrics } from "./NativeDeviceInfo"
            type DimensionsValue = {
              window?: DisplayMetrics
              screen?: DisplayMetrics
            }
          ` as t.Statement[]
          )
        },
      },
      TSDeclareMethod: {
        exit(path) {
          t.assertTSDeclareMethod(path.node)
          t.assertIdentifier(path.node.key)
          if (
            path.node.key.name === "get" &&
            path.findParent((p) => p.isDeclareClass() && p.node.id.name === "Dimensions")
          ) {
            const prop = (ast`
            class _ {
              static get<K extends keyof DimensionsValue>(dim: K): Required<DimensionsValue>[K]
            }
          ` as t.ClassDeclaration).body.body[0]
            path.replaceWith(prop)
            path.skip()
          }
        },
      },
    },
  ],
  [
    "Libraries/Components/View/ViewPropTypes.d.ts",
    {
      TSPropertySignature: {
        exit(path) {
          if (t.isIdentifier(path.node.key) && path.node.key.name === "focusable") {
            const typeAnnotation = path.node.typeAnnotation!.typeAnnotation
            t.assertTSBooleanKeyword(typeAnnotation)
            path.node.typeAnnotation!.typeAnnotation = t.tsUnionType([
              t.tsNullKeyword(),
              t.tsUndefinedKeyword(),
              t.tsBooleanKeyword(),
            ])
          }
        },
      },
    },
  ],
  // This is done so people can merge their own NativeModules interface declaration.
  [
    "Libraries/BatchedBridge/NativeModules.d.ts",
    {
      DeclareVariable: {
        exit(path) {
          const id = path.node.id
          if (t.isIdentifier(id) && id.name === "NativeModules") {
            t.assertTypeAnnotation(id.typeAnnotation)
            const typeLiteral = id.typeAnnotation.typeAnnotation as any
            t.assertTSTypeLiteral(typeLiteral)
            const members = typeLiteral.members
            path.insertBefore(
              t.exportNamedDeclaration(
                t.tsInterfaceDeclaration(
                  t.identifier("NativeModules"),
                  undefined,
                  undefined,
                  t.tsInterfaceBody(members)
                )
              )
            )
            id.typeAnnotation.typeAnnotation = t.tsTypeReference(t.identifier("NativeModules")) as any
          }
        },
      },
    },
  ],
  // TODO: This is pending the work to port the better DT typings to Flow:
  // https://github.com/microsoft/flow2dts/issues/14
  [
    "Libraries/Network/XMLHttpRequest.d.ts",
    {
      TSTypeReference: {
        exit(path) {
          if (t.isIdentifier(path.node.typeName) && path.node.typeName.name === "EventListener") {
            path.replaceWith(t.tsAnyKeyword())
          }
        },
      },
    },
  ],
  [
    "Libraries/Animated/createAnimatedComponent.d.ts",
    {
      TSTypeParameter: {
        exit(path) {
          if (path.node.name === "Props") {
            const constraint = path.node.constraint
            t.assertTSTypeLiteral(constraint)
            constraint.members = []
          }
        },
      },
    },
  ],
]

export default visitors
