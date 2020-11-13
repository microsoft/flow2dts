import { Visitor, types as t, traverse } from "@babel/core"

export interface Options {
  overrides: t.Node
}

interface NormalizedOverrides {
  types: Map<string, t.Node>
}

interface State extends Options {
  normalizedOverrides: NormalizedOverrides
}

export function createOverrideDeclarationVisitor(options: Options) {
  const normalizedOverrides: NormalizedOverrides = {
    types: new Map(),
  }
  traverse(options.overrides, {
  })
  const visitor: Visitor = {
  }
  return visitor
}
