// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t } from "@babel/core"
import babelGenerator from "@babel/generator"
import { State } from "../state"
import { assertTSType, assertTSTypeElement, nameForTypeIndexerKey } from "../utilities"

export const objectTypeVisitor: Visitor<State> = {
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

      let rewrittenKey = <undefined | t.FlowType | t.TSType>key
      let resolvedAlias = false
      while (rewrittenKey && rewrittenKey.type !== "TSStringKeyword" && rewrittenKey.type !== "TSNumberKeyword") {
        switch (rewrittenKey.type) {
          case "StringTypeAnnotation": {
            rewrittenKey = t.tsStringKeyword()
            continue
          }
          case "NumberTypeAnnotation": {
            rewrittenKey = t.tsStringKeyword()
            continue
          }
          case "TSTypeReference": {
            if (!resolvedAlias && rewrittenKey.typeName.type === "Identifier") {
              // termporarily only allow one step of alias resolving
              resolvedAlias = true

              const binding = path.scope.getBinding(rewrittenKey.typeName.name)
              const alias = binding?.path.node

              switch (alias?.type) {
                case "TypeAlias": {
                  rewrittenKey = alias.right
                  continue
                }
                case "TSTypeAliasDeclaration": {
                  rewrittenKey = alias.typeAnnotation
                  continue
                }
              }
            }

            rewrittenKey = undefined
            break
          }
          default:
            rewrittenKey = undefined
        }
      }

      if (rewrittenKey) {
        const identifier = t.identifier(id === null ? nameForTypeIndexerKey : id.name)
        identifier.typeAnnotation = t.tsTypeAnnotation(rewrittenKey)

        const indexSignature = t.tsIndexSignature([identifier], t.tsTypeAnnotation(value))
        indexSignature.readonly = readonly

        path.replaceWith(indexSignature)
      } else {
        path.addComment(
          "leading",
          `[FLOW2DTS - Warning] The key type '${
            babelGenerator(key).code
          }' was unresolvable in the original Flow source.`
        )

        const idString = t.identifier(id === null ? nameForTypeIndexerKey : id.name)
        idString.typeAnnotation = t.tsTypeAnnotation(t.tsStringKeyword())
        const sigString = t.tsIndexSignature([idString], t.tsTypeAnnotation(value))
        sigString.readonly = readonly

        const idNumber = t.identifier(id === null ? nameForTypeIndexerKey : id.name)
        idNumber.typeAnnotation = t.tsTypeAnnotation(t.tsNumberKeyword())
        const sigNumber = t.tsIndexSignature([idNumber], t.tsTypeAnnotation(value))
        sigNumber.readonly = readonly

        // FIXME: "value" is shared in two TSIndexSignature, which could cause issues in the future
        path.replaceWithMultiple([sigString, sigNumber])
      }
    },
  },
  ObjectTypeProperty: {
    exit(path) {
      const { key, kind, variance, optional } = path.node
      let value = path.node.value as any
      assertTSType(value)

      if (
        t.isTSFunctionType(value) &&
        path.parentPath.isObjectTypeAnnotation() &&
        path.parentPath.parentPath.isDeclareClass()
      ) {
        const isConstructor = (t.isIdentifier(key) ? key.name : key.value) === "constructor"
        const declareMethod = t.tsDeclareMethod(
          null,
          key,
          value.typeParameters,
          value.parameters,
          isConstructor ? undefined : value.typeAnnotation
        )
        declareMethod.static = path.node.static
        path.replaceWith(declareMethod)
      } else {
        const readonly = variance && variance.kind === "plus"
        const writeonly = variance && variance.kind === "minus"

        if (writeonly) {
          path.addComment(
            "leading",
            "[FLOW2DTS - Warning] This property was a write-only property in the original Flow source."
          )
        }

        // TODO: Mark as readonly if no `set` version exists
        if (kind === "get") {
          t.assertTSFunctionType(value)
          value = value.typeAnnotation!.typeAnnotation
        }

        switch (path.parentPath?.parentPath?.node?.type) {
          case "ClassDeclaration":
          case "DeclareClass": {
            // ClassProperty: class, declare class
            const classProp = t.classProperty(
              key.type === "Identifier" ? t.identifier(key.name) : t.stringLiteral(key.value),
              null,
              t.tsTypeAnnotation(value)
            )
            classProp.readonly = readonly
            classProp.optional = optional
            classProp.static = path.node.static

            path.replaceWith(classProp)
            break
          }
          default: {
            // TSPropertySignature: interface, declare interface, type literal
            const propertySignature = t.tsPropertySignature(
              key.type === "Identifier" ? t.identifier(key.name) : t.stringLiteral(key.value),
              t.tsTypeAnnotation(value)
            )
            propertySignature.readonly = readonly
            propertySignature.optional = optional

            path.replaceWith(propertySignature)
            break
          }
        }
      }
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
      switch (path.parentPath.node.type) {
        case "ClassDeclaration":
        case "DeclareClass": {
          // ClassBody: class, declare class
          let { properties, indexers } = path.node
          if (!indexers) indexers = []
          path.replaceWith(
            t.classBody([
              ...(<(t.TSDeclareMethod | t.ClassProperty)[]>(<unknown>properties)),
              ...(<t.TSIndexSignature[]>(<unknown>indexers)),
            ])
          )
          return
        }
      }
      switch (path.parentPath.node.type) {
        case "InterfaceDeclaration":
        case "DeclareInterface": {
          // TSInterfaceBody: interface, declare interface
          let { properties, callProperties, indexers } = path.node
          if (!indexers) indexers = []
          path.replaceWith(
            t.tsInterfaceBody([
              ...(<(t.TSMethodSignature | t.TSPropertySignature)[]>(<unknown>properties)),
              ...(<t.TSCallSignatureDeclaration[]>(<unknown>callProperties)),
              ...(<t.TSIndexSignature[]>(<unknown>indexers)),
            ])
          )
          return
        }
      }
      const { exact, properties, callProperties, indexers } = path.node // TODO: callProperties, inexact

      if (exact) {
        path.addComment(
          "leading",
          "[FLOW2DTS - Warning] This type was an exact object type in the original Flow source."
        )
      }

      // {x: number, ...T, y: number} to T & {x: number} & {y: number}
      const elements: Array<t.TSTypeElement | t.TSMethodSignature> = []
      const spreads: t.TSType[] = []

      for (const prop of properties) {
        if (t.isObjectTypeSpreadProperty(prop)) {
          const { argument } = prop
          assertTSType(argument)
          spreads.push(argument)
        } else if (t.isTSTypeElement(prop) || t.isTSMethodSignature(prop)) {
          elements.push(prop)
        } else {
          throw path.buildCodeFrameError("Unexpected property type")
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
}
