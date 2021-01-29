// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t, traverse } from "@babel/core"
import { isMatch } from "micromatch"

export type OverridesVisitor<S = any> = [pathPattern: string, visitor: Visitor<S>]

export interface OverridesVisitorObject<S = any> {
  pathPattern: string
  visitor: Visitor<S>
  madeChangesToNumberOfFiles: number
}

export function initVisitorObjects(visitors: OverridesVisitor[]): OverridesVisitorObject[] {
  return visitors.map(([pathPattern, visitor]) => ({ pathPattern, visitor, madeChangesToNumberOfFiles: 0 }))
}

export function applyOverridesVisitors(pathname: string, fileNode: t.File, visitorObjects: OverridesVisitorObject[]) {
  const state = {}
  visitorObjects.forEach((visitorObject) => {
    if (isMatch(pathname, visitorObject.pathPattern)) {
      const before = JSON.stringify(fileNode)
      traverse(fileNode, visitorObject.visitor, undefined, state)
      const after = JSON.stringify(fileNode)
      if (after !== before) {
        visitorObject.madeChangesToNumberOfFiles++
      }
    }
  })
}
