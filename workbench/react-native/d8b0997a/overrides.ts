import { OverridesVisitor } from "../../../packages/flow2dts/src/transform/applyOverridesVisitors"
import template from "@babel/template"
import { types as t } from "@babel/core"
import { NodePath, Scope, Visitor } from "@babel/traverse"

const ast = template({
  plugins: ["typescript"],
}).ast

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

function unwrapTypeOfHelper(type: t.TSType): t.TSType {
  if (t.isTSUnionType(type)) {
    return t.tsUnionType(type.types.map(unwrapTypeOfHelper))
  } else if (
    t.isTSTypeReference(type) &&
    t.isIdentifier(type.typeName) &&
    type.typeName.name === "$TypeOf" &&
    t.isTSTypeParameterInstantiation(type.typeParameters)
  ) {
    return type.typeParameters.params[0]
  } else {
    return type
  }
}

// React.ElementRef actually requires the typeof a class based component.
function removeTypeOfHelperForReactElementRef(path: NodePath<t.TSTypeReference>) {
  const id = path.node.typeName
  if (
    t.isTSQualifiedName(id) &&
    t.isIdentifier(id.left) &&
    isReactImportSpecifier(path.scope, id.left) &&
    t.isTSTypeParameterInstantiation(path.node.typeParameters)
  ) {
    if (id.right.name === "ElementRef") {
      path.node.typeParameters.params[0] = unwrapTypeOfHelper(path.node.typeParameters.params[0])
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

const visitors: OverridesVisitor[] = [
  [
    "**/*",
    {
      // TODO: We should convert DeclareClass, which is a Flow type, to ClassDeclaration.
      DeclareClass: {
        exit(path) {
          noVoidForReactComponentState(path)
        },
      },
      TSTypeReference: {
        exit(path) {
          removeTypeOfHelperForReactElementRef(path)
          removeUnknownFromHostComponent(path)
        },
      },
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
          // TODO: Copy this from the v0.63.3 typings
          // These deprecated DT types are defined in a separate file for ease of external contribution.
          // path.pushContainer("body", ast`export * from "./TypeScriptSupplementals"` as t.Statement[])
        },
      },
      ImportDefaultSpecifier: {
        exit(path) {
          if (path.node.local.name === "Animated$f2tTypeof") {
            path.replaceWith(t.importNamespaceSpecifier(path.node.local))
          }
        },
      },
    },
  ],
  // TODO: New overrides API should allow multiple overrides to a single file, so that this can be grouped together with the 'animated' override above in `index.d.ts`
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
  ["Libraries/Lists/SectionList.d.ts", listsVisitor],
  [
    "Libraries/Lists/VirtualizedSectionList.d.ts",
    {
      ...listsVisitor,
      // FIXME: This is a temp workaround for https://github.com/microsoft/flow2dts/issues/15
      TSTypeReference: {
        exit(path) {
          const typeName = path.node.typeName
          if (
            path.find((p) => p.isTSTypeAliasDeclaration() && p.node.id.name === "DefaultProps") &&
            t.isTSQualifiedName(typeName) &&
            t.isIdentifier(typeName.left) &&
            typeName.left.name === "$2" &&
            t.isIdentifier(typeName.right) &&
            typeName.right.name === "defaultProps"
          ) {
            path.replaceWith(t.tsTypeQuery(typeName))
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
  [
    "Libraries/promiseRejectionTrackingOptions.d.ts",
    {
      DeclareVariable: {
        exit(path) {
          if (path.node.id.name === "rejectionTrackingOptions") {
            const replacementDeclaration = ast`
            declare var rejectionTrackingOptions: Parameters<enable>[0]
          ` as t.VariableDeclaration
            path.replaceWith(replacementDeclaration)
            path.skip()
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
            import Animated from "../../Animated/Animated"
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
  [
    "Libraries/vendor/emitter/EventEmitter.d.ts",
    {
      VariableDeclaration: {
        exit(path, state: any) {
          const declarator = path.node.declarations[0]
          if (declarator && t.isIdentifier(declarator.id) && declarator.id.name === "$f2tExportDefault") {
            const typeAnnotation = declarator.id.typeAnnotation
            t.assertTSTypeAnnotation(typeAnnotation)
            const typeOfHelper = typeAnnotation.typeAnnotation

            let typeQuery: t.TSTypeQuery
            if (typeOfHelper.type === "TSTypeQuery") {
              typeQuery = typeOfHelper
            } else {
              t.assertTSTypeReference(typeOfHelper)
              if (!typeOfHelper.typeParameters || typeOfHelper.typeParameters.params.length !== 1) {
                throw path.buildCodeFrameError("Expected $TypeOf to have 1 type parameter")
              }
              const typeofQueryParam = typeOfHelper.typeParameters.params[0]
              t.assertTSTypeQuery(typeofQueryParam)
              typeQuery = typeofQueryParam
            }

            t.assertIdentifier(typeQuery.exprName)
            state.eventEmitterClassVar = typeQuery.exprName
            path.remove()
          }
        },
      },
      ExportDefaultDeclaration: {
        exit(path, state: any) {
          t.assertIdentifier(path.node.declaration)
          path.node.declaration = state.eventEmitterClassVar
        },
      },
    },
  ],
  [
    "Libraries/EventEmitter/NativeEventEmitter.d.ts",
    {
      // TODO: We should convert DeclareClass, which is a Flow type, to ClassDeclaration.
      DeclareClass: {
        exit(path) {
          if (path.node.id.name === "NativeEventEmitter") {
            path.insertBefore(ast`
            type EventEmitterWithoutAddListenerType = new (...args: ConstructorParameters<typeof EventEmitter>) => Omit<
              InstanceType<typeof EventEmitter>,
              "addListener" | "removeAllListeners" | "removeSubscription"
            >
            declare const EventEmitterWithoutAddListener: EventEmitterWithoutAddListenerType
          `)
            const superclass = path.node.extends && path.node.extends[0]
            t.assertInterfaceExtends(superclass)
            superclass.id = t.identifier("EventEmitterWithoutAddListener")
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
    "Libraries/Animated/src/createAnimatedComponent.d.ts",
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
  // TODO: These should be typed as such upstream
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
]

export default visitors
