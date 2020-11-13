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
    TSTypeAliasDeclaration(path) {
      normalizedOverrides.types.set(path.node.id.name, path.node)
    },
    TSInterfaceDeclaration(path) {
      normalizedOverrides.types.set(path.node.id.name, path.node)
    },
  })
  const visitor: Visitor = {
    TSTypeAliasDeclaration: {
      exit(path, state) {
        const override = normalizedOverrides.types.get(path.node.id.name)
        if (override) {
          path.replaceWith(override)
        }
      },
    },
    TSInterfaceDeclaration: {
      exit(path, state) {
        const override = normalizedOverrides.types.get(path.node.id.name) as t.TSInterfaceDeclaration
        if (override) {
          if (override.typeParameters) {
            path.node.typeParameters = override.typeParameters
          }
        }
      },
    },
  }
  return visitor
}
