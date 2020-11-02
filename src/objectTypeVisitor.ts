import { PluginPass, Visitor, types as t } from "@babel/core"
import { assertTSType, assertTSTypeElement, assertTSTypeAnnotation } from "./utilities"

export const objectTypeVisitor: Visitor<PluginPass> = {
  ObjectTypeIndexer: {
    exit(path) {
      const { id, key, value, variance } = path.node
      assertTSType(key)
      assertTSType(value)

      const readonly = variance && variance.kind === "plus"
      const writeonly = variance && variance.kind === "minus"

      if (writeonly) {
        path.addComment(
          "leading",
          "[FLOW2DTS - Warning] This property was a write-only property in the original Flow source."
        )
      }

      const identifier = t.identifier(id === null ? "$" : id.name)
      identifier.typeAnnotation = t.tsTypeAnnotation(key)

      const indexSignature = t.tsIndexSignature([identifier], t.tsTypeAnnotation(value))
      indexSignature.readonly = readonly

      path.replaceWith(indexSignature)
    },
  },
  ObjectTypeProperty: {
    exit(path) {
      const { key, value, variance, optional } = path.node
      assertTSType(value)

      const readonly = variance && variance.kind === "plus"
      const writeonly = variance && variance.kind === "minus"

      if (writeonly) {
        path.addComment(
          "leading",
          "[FLOW2DTS - Warning] This property was a write-only property in the original Flow source."
        )
      }

      const propertySignature = t.tsPropertySignature(
        key.type === "Identifier" ? t.identifier(key.name) : t.stringLiteral(key.value),
        t.tsTypeAnnotation(value)
      )
      propertySignature.readonly = readonly
      propertySignature.optional = optional

      path.replaceWith(propertySignature)
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
          assertTSType(argument)
          spreads.push(argument)
        } else {
          assertTSTypeElement(prop)
          elements.push(prop)
        }
      }

      // TODO: maintain the position of indexers
      indexers!.forEach((indexer: t.Node) => {
        t.assertTSIndexSignature(indexer)
        const value = indexer.typeAnnotation!.typeAnnotation
        const keyTypeAnnotation = indexer.parameters[0].typeAnnotation
        assertTSTypeAnnotation(keyTypeAnnotation)
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
      assertTSType(right)
      const newAst = t.tsTypeAliasDeclaration(id, undefined, right)
      newAst.declare = true
      path.replaceWith(newAst)
    },
  },
}
