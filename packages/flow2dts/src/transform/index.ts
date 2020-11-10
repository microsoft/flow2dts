import { PluginObj, types as t } from "@babel/core"
import { initializeState, State } from "./state"
import { typeReferenceRecognizerVisitor } from "./typeReferenceResolver"
import { rewriteTypeVisitor } from "./rewriteTypeVisitors"
import { rewriteDeclVisitor } from "./rewriteDeclVisitors"
import { polyfillTypes } from "./polyfillTypes"
import { fixupVisitor } from "./fixupVisitor"

export function transform(): PluginObj<State> {
  return {
    name: "flow2dtsTransform",
    visitor: {
      Program: {
        enter(_path, state) {
          initializeState(state)
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
          path.traverse(typeReferenceRecognizerVisitor, state)
          path.traverse(rewriteTypeVisitor, state)
          path.traverse(rewriteDeclVisitor, state)

          /**
           * Fixes some AST issues.
           */
          path.traverse(fixupVisitor, state)

          path.node.body.unshift(...polyfillTypes(state.polyfillTypes))
        },
      },
    },
  }
}
