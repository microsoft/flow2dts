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
    ClassDeclaration(path) {
      normalizedOverrides.types.set(path.node.id.name, path.node)
    },
  })
  const visitor: Visitor = {
    TSTypeAliasDeclaration: {
      exit(path) {
        const override = normalizedOverrides.types.get(path.node.id.name) as t.TSTypeAliasDeclaration | undefined
        if (override) {
          if (t.isTSTypeAliasDeclaration(override) && t.isTSUndefinedKeyword(override.typeAnnotation)) {
            // The override is a TSTypeAlias as well but doesn't define a implementation override (undefined),
            // so use the original implementation.
            path.replaceWith({ ...override, typeAnnotation: path.node.typeAnnotation })
          } else {
            path.replaceWith(override)
          }
          path.skip()
        }
      },
    },
    TSInterfaceDeclaration: {
      exit(path) {
        const override = normalizedOverrides.types.get(path.node.id.name) as t.TSInterfaceDeclaration | undefined
        if (override) {
          if (override.typeParameters) {
            path.node.typeParameters = override.typeParameters
          } else {
            throw new Error("TODO: Unknown")
          }
        }
      },
    },
    ClassDeclaration: {
      exit(path) {
        const override = normalizedOverrides.types.get(path.node.id.name) as t.ClassDeclaration | undefined
        if (override) {
          if (override.typeParameters) {
            t.assertTSTypeParameterDeclaration(override.typeParameters)
            const originalTypeParameterDeclaration = path.node.typeParameters
            if (originalTypeParameterDeclaration) {
              t.assertTSTypeParameterDeclaration(originalTypeParameterDeclaration)
              const originalTypeParams = originalTypeParameterDeclaration.params
              override.typeParameters.params.forEach((overrideParam) => {
                const originalParam = originalTypeParams.find(
                  (originalParam) => originalParam.name === overrideParam.name
                )
                if (originalParam) {
                  originalParam.constraint = overrideParam.constraint
                  originalParam.default = overrideParam.default
                } else {
                  throw new Error("TODO: Unknown")
                }
              })
              return
            }
          }
          throw new Error("TODO: Unknown")
        }
      },
    },
  }
  return visitor
}
