import { PluginObj, types as t } from "@babel/core"

export function flow2dtsTransform(): PluginObj {
  return {
    name: flow2dtsTransform.name,
    visitor: {
      ObjectTypeIndexer: {
        exit(path) {
          const { id, key, value, variance } = path.node

          t.assertTSType(key)
          t.assertTSType(value)

          const readonly = variance && variance.kind === "plus"
          const writeonly = variance && variance.kind === "minus"

          if (writeonly) {
            path.addComment(
              "leading",
              "[FLOW2DTS - Warning] This property was a write-only property in the original Flow source."
            )
          }

          const identifier = t.identifier(id ? id.name : "key")
          identifier.typeAnnotation = t.tsTypeAnnotation(key)

          const indexSignature = t.tsIndexSignature([identifier], t.tsTypeAnnotation(value))
          indexSignature.readonly = readonly

          path.replaceWith(indexSignature)
        },
      },
      ObjectTypeAnnotation: {
        exit(path, state) {
          const { exact, properties, indexers } = path.node // TODO: callProperties, inexact

          if (exact) {
            path.addComment(
              "leading",
              "[FLOW2DTS - Warning] This type was an exact object type in the original Flow source."
            )
          }

          // TODO: create multiple sets of elements so that we can convert
          // {x: number, ...T, y: number} to {x: number} & T & {y: number}
          const elements: t.TSTypeElement[] = []
          const spreads: t.TSType[] = []

          for (const prop of properties) {
            if (t.isObjectTypeSpreadProperty(prop)) {
              const { argument } = prop
              t.assertTSType(argument)
              spreads.push(argument)
            } else {
              t.assertTSTypeElement(prop)
              elements.push(prop)
            }
          }

          // TODO: maintain the position of indexers
          indexers!.forEach((indexer: t.Node) => {
            t.assertTSIndexSignature(indexer)
            const value = indexer.typeAnnotation!.typeAnnotation
            const keyTypeAnnotation = indexer.parameters[0].typeAnnotation
            t.assertTSTypeAnnotation(keyTypeAnnotation)
            const key = keyTypeAnnotation.typeAnnotation
            if (t.isTSSymbolKeyword(key) || t.isTSStringKeyword(key) || t.isTSNumberKeyword(key)) {
              elements.push(indexer)
            } else {
              // TODO: Is it correct to use `any` as the default here?
              const typeParameter = t.tsTypeParameter(key, t.tsAnyKeyword(), indexer.parameters[0].name)

              const mappedType = t.tsMappedType(typeParameter, value)
              mappedType.optional = true

              spreads.push(mappedType)
            }
          })

          if (spreads.length > 0 && elements.length > 0) {
            path.replaceWith(t.tsIntersectionType([...spreads, t.tsTypeLiteral(elements)]))
          } else if (spreads.length > 0) {
            path.replaceWith(t.tsIntersectionType(spreads))
          } else {
            const typeLiteral = t.tsTypeLiteral(elements)
            // typeLiteral.newlines = path.node.newlines;
            path.replaceWith(typeLiteral)
          }
        },
      },
      TypeAlias: {
        exit(path) {
          const { id, typeParameters, right } = path.node
          if (typeParameters) {
            t.assertTSTypeParameterDeclaration(typeParameters)
          }
          t.assertTSType(right)
          path.replaceWith(t.tsTypeAliasDeclaration(id, typeParameters, right))
        },
      },
    },
  }
}

export default flow2dtsTransform
