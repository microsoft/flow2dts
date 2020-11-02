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
  ObjectTypeCallProperty: {
    exit(path) {
      const { value } = path.node
      assertTSType(value)

      const callSignature = t.tsCallSignatureDeclaration(
        (<t.TSFunctionType>value).typeParameters,
        (<t.TSFunctionType>value).parameters,
        (<t.TSFunctionType>value).typeAnnotation
      )

      path.replaceWith(callSignature)
    },
  },
  ObjectTypeAnnotation: {
    exit(path, state) {
      const { exact, properties, callProperties, indexers } = path.node // TODO: callProperties, inexact

      if (exact) {
        path.addComment(
          "leading",
          "[FLOW2DTS - Warning] This type was an exact object type in the original Flow source."
        )
      }

      // {x: number, ...T, y: number} to T & {x: number} & {y: number}
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

      for (const prop of callProperties!) {
        assertTSTypeElement(prop)
        elements.push(prop)
      }

      for (const prop of indexers!) {
        assertTSTypeElement(prop)
        elements.push(prop)
      }

      const typeLiteral = t.tsTypeLiteral(elements)
      if (spreads.length > 0) {
        path.replaceWith(t.tsIntersectionType([...spreads, typeLiteral]))
      } else {
        const typeLiteral = t.tsTypeLiteral(elements)
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
