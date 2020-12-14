// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PluginObj, traverse, types as t } from "@babel/core"
import { initializeState, State } from "./state"
import { typeReferenceRecognizerVisitor } from "./typeReferenceResolver"
import { rewriteTypeVisitor } from "./rewriteTypeVisitors"
import { rewriteDeclVisitor } from "./rewriteDeclVisitors"
import { createFixupVisitor, Options as FixupOptions } from "./fixupVisitor"
import { applyOverridesVisitors, OverridesVisitors } from "./applyOverridesVisitors"
import { emitImportsForTypeReferencesVisitor } from "./emitImportsForTypeReferencesVisitor"
import { polyfillPackagesAndTypes } from "./polyfillPackagesAndTypes"
// "flow2hint" does't work, I guess because there is no generated .d.ts files
import { ResolvedHintFile } from "../../../flow2hint/src/hintfile"

export interface Options extends FixupOptions {
  pathname?: string
  hintFile?: ResolvedHintFile
  overridesVisitors?: OverridesVisitors
}

export function transform(_api: unknown, options: Options, _dirname: string): PluginObj<State> {
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
          path.traverse(createFixupVisitor(options), state)

          /**
           *
           */
          const fileNode = t.file(path.node)

          /**
           * Add polyfill imports.
           */
          traverse(fileNode, emitImportsForTypeReferencesVisitor, undefined, {
            packagesAndTypes: polyfillPackagesAndTypes,
          })

          /**
           * Finally, override declarations with custom provided ones.
           */
          if (options && options.pathname && options.overridesVisitors) {
            applyOverridesVisitors(options.pathname, fileNode, options.overridesVisitors)
          }
        },
      },
    },
  }
}
