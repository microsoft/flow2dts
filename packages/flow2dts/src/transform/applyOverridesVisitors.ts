// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t, traverse } from "@babel/core"
import micromatch from "micromatch"

export type OverridesVisitor<S = any> = [pathPattern: string, visitor: Visitor<S>]

export function applyOverridesVisitors(pathname: string, fileNode: t.File, visitors: OverridesVisitor[]) {
  const state = {}
  visitors.forEach(([pathPattern, visitor]) => {
    if (micromatch.isMatch(pathname, pathPattern)) {
      traverse(fileNode, visitor, undefined, state)
    }
  })
}
