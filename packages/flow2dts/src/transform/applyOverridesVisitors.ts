import { Visitor, types as t, traverse } from "@babel/core"

export type OverridesVisitors<S extends {} = {}> = { all?: Visitor<S>; [Path: string]: Visitor<S> | undefined }

export function applyOverridesVisitors(pathname: string, fileNode: t.File, visitors: OverridesVisitors) {
  const state = {}
  if (visitors.all) {
    traverse(fileNode, visitors.all, undefined, state)
  }
  const fileSpecificVisitor = visitors[pathname]
  if (fileSpecificVisitor) {
    traverse(fileNode, fileSpecificVisitor, undefined, state)
  }
}
