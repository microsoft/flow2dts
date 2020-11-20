import { OverridesVisitors } from "../packages/flow2dts/src/transform/applyOverridesVisitors"
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
 * however the React DT typings do not allow that and in reality React sets it
 * to `null` at runtime. So here we simply replace `void` with `null`.
 *
 * TODO: Currently only handling PureComponent
 */
function nullifyReactComponentState(path: NodePath<t.DeclareClass>) {
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
          typeParameters.params[1] = t.tsNullKeyword()
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

const visitors: OverridesVisitors = {
  all: {
    // TODO: We should convert DeclareClass, which is a Flow type, to ClassDeclaration.
    DeclareClass: {
      exit(path) {
        nullifyReactComponentState(path)
      },
    },
    TSTypeReference: {
      exit(path) {
        removeTypeOfHelperForReactElementRef(path)
      },
    },
  },
  "Libraries/Lists/SectionList.d.ts": listsVisitor,
  "Libraries/Lists/VirtualizedSectionList.d.ts": listsVisitor,
  "Libraries/Components/TextInput/TextInputNativeCommands.d.ts": {
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
  "Libraries/Performance/PureComponentDebug.d.ts": {
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
  "Libraries/Interaction/PanResponder.d.ts": {
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
  "Libraries/Utilities/ReactNativeTestTools.d.ts": {
    TSTypeAliasDeclaration: {
      exit(path) {
        if (path.node.id.name === "$ReturnType") {
          const replacementDeclaration = ast`
            declare type $ReturnType<Fn extends (...args: any) => any> = ReturnType<Fn>
          ` as t.TSTypeAliasDeclaration
          path.replaceWith(replacementDeclaration)
          path.skip()
        }
      },
    },
  },
  "Libraries/promiseRejectionTrackingOptions.d.ts": {
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
  // TODO: This should be fixed upstream in RN.
  "Libraries/Text/TextProps.d.ts": {
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
}

export default visitors
