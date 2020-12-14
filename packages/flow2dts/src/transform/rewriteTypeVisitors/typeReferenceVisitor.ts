// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t, NodePath } from "@babel/core"
import { State } from "../state"
import { assertTSType, isClass, wrappedTypeOf } from "../utilities"
import { resolveGenericTypeAnnotation } from "../typeReferenceResolver"

function convertQID(input: t.Identifier | t.QualifiedTypeIdentifier): t.Identifier | t.TSQualifiedName {
  if (input.type === "Identifier") {
    return t.identifier(input.name)
  } else {
    return t.tsQualifiedName(convertQID(input.qualification), t.identifier(input.id.name))
  }
}

function isLiteralOrKeywordOrUnionThereof(node: t.TSType): boolean {
  if (t.isTSUnionType(node)) {
    return node.types.every(isLiteralOrKeywordOrUnionThereof)
  } else if (
    t.isTSLiteralType(node) ||
    t.isTSBooleanKeyword(node) ||
    t.isTSAnyKeyword(node) ||
    t.isTSVoidKeyword(node) ||
    t.isTSNullKeyword(node) ||
    t.isTSUndefinedKeyword(node) ||
    t.isTSUnknownKeyword(node) ||
    // TODO: Unclear why this is not a TSUnknownKeyword
    (t.isTSTypeReference(node) && t.isIdentifier(node.typeName) && node.typeName.name === "unknown")
  ) {
    return true
  }
  return false
}

export const typeReferenceVisitor: Visitor<State> = {
  GenericTypeAnnotation: {
    exit(path, state) {
      const resolved = resolveGenericTypeAnnotation(state, path, path.node)
      if (resolved) {
        path.replaceWith(resolved)
        return
      }

      if (path.node.id.type === "Identifier") {
        const name = path.node.id.name
        const typeParameters =
          path.node.typeParameters === null ? null : ((path.node.typeParameters.params as unknown) as t.TSType[])
        if (typeParameters) {
          typeParameters.forEach(assertTSType)
        }

        if (name === "undefined") {
          path.replaceWith(t.tsUndefinedKeyword())
        } else if (name === "Promise" && (!typeParameters || typeParameters.length === 0)) {
          path.replaceWith(
            t.tsTypeReference(t.identifier("Promise"), t.tsTypeParameterInstantiation([t.tsVoidKeyword()]))
          )
        } else if (name === "Array" && typeParameters) {
          if (typeParameters.length !== 1) {
            throw path.buildCodeFrameError(
              `Array must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.replaceWith(t.tsArrayType(typeParameters[0]))
        } else if (name === "$ReadOnlyArray") {
          if (!typeParameters || typeParameters.length !== 1) {
            throw path.buildCodeFrameError(
              `$ReadOnlyArray must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.replaceWith(
            t.tsTypeReference(t.identifier("ReadonlyArray"), t.tsTypeParameterInstantiation(typeParameters))
          )
        } else if (name === "$ReadOnly") {
          if (!typeParameters || typeParameters.length !== 1) {
            throw path.buildCodeFrameError(
              `$ReadOnly must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.replaceWith(t.tsTypeReference(t.identifier("Readonly"), t.tsTypeParameterInstantiation(typeParameters)))
        } else if (name === "$Exact") {
          if (!typeParameters || typeParameters.length !== 1) {
            throw path.buildCodeFrameError(
              `$Exact must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.addComment(
            "leading",
            "[FLOW2DTS - Warning] This type was an exact object type in the original Flow source."
          )
          path.replaceWith(typeParameters[0])
        } else if (name === "$ObjMap" || name === "$ObjMapi") {
          if (!typeParameters || typeParameters.length !== 2) {
            throw path.buildCodeFrameError(
              `${name} must have exactly two type arguments:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          let [objectType, functionType] = typeParameters
          let typeReference = null
          if (t.isTSTypeReference(functionType)) {
            t.assertIdentifier(functionType.typeName)
            const binding = path.scope.getBinding(functionType.typeName.name)
            const typeAlias = binding && binding.path.node
            t.assertTypeAlias(typeAlias) // TODO: This should be a TSTypeAliasDeclaration at some point
            typeReference = functionType
            functionType = (typeAlias.right as unknown) as t.TSType
          }
          t.assertTSFunctionType(functionType)
          t.assertTSTypeAnnotation(functionType.typeAnnotation)
          const returnType = functionType.typeAnnotation.typeAnnotation
          if (!isLiteralOrKeywordOrUnionThereof(returnType)) {
            throw path.buildCodeFrameError(
              `${name} can only be converted with function types that have literal return types or a union of literals. Use an override instead.`
            )
          }
          const inKeysType = t.tsTypeOperator(objectType)
          inKeysType.operator = "keyof"
          path.addComment("leading", "[FLOW2DTS - Warning] This type was a $ObjMap type in the original Flow source.")
          path.replaceWith(
            t.tsMappedType(
              t.tsTypeParameter(inKeysType, undefined, "K"),
              t.tsTypeReference(
                t.identifier("ReturnType"),
                t.tsTypeParameterInstantiation([typeReference || functionType])
              )
            )
          )
        } else {
          if (typeParameters && typeParameters.length > 0) {
            path.replaceWith(t.tsTypeReference(t.identifier(name), t.tsTypeParameterInstantiation(typeParameters)))
          } else {
            path.replaceWith(t.tsTypeReference(t.identifier(name)))
          }
        }
      } else {
        if (path.node.typeParameters) {
          for (const flowType of path.node.typeParameters.params) {
            assertTSType(flowType)
          }
        }

        const qid = convertQID(path.node.id)
        const args = path.node.typeParameters
          ? t.tsTypeParameterInstantiation(<t.TSType[]>(<unknown>path.node.typeParameters.params))
          : undefined
        path.replaceWith(t.tsTypeReference(qid, args))
      }
    },
  },
  TypeofTypeAnnotation: {
    enter(path, state) {
      /*
       if X needs to be resolved, typeof should be translated to the resolved type.
       this needs to be do before entering GenericTypeAnnotation,
       or it is hard to tell if part of a translated GenericTypeAnnotation is resolved or not
       */
      const typeQueryOperator = path.node.argument
      if (typeQueryOperator.type === "GenericTypeAnnotation") {
        const resolved = resolveGenericTypeAnnotation(state, path, typeQueryOperator)
        if (resolved) {
          /*
           if it is resolved to be TSTypeReference(TSEntityName),
           then check the first name to see if it is from an imports or a variable,
           and translate to $TypeOf<typeof T> accordingly
           */
          if (
            resolved.type === "TSTypeReference" &&
            (!resolved.typeParameters || resolved.typeParameters.params.length === 0)
          ) {
            let firstName = resolved.typeName

            /*
             TODO:
             later more information will be added to hint file for "TSQualifiedName" like "React.ElementRef"
             */
            if (firstName.type === "Identifier") {
              if (state.hintFile) {
                const hintImport = state.hintFile.imports[firstName.name]
                if (hintImport) {
                  switch (hintImport.type) {
                    case "type":
                    case "class": {
                      // it is a type, just use the identifier
                      path.replaceWith(resolved)
                      return
                    }
                    case "value": {
                      // it is a value, need to add "typeof"
                      path.replaceWith(t.tsTypeQuery(firstName))
                      return
                    }
                  }
                }
              }

              const binding = path.scope.getBinding(firstName.name)
              if (binding && (binding.path.isDeclareVariable() || binding.path.isVariableDeclaration())) {
                path.replaceWith(wrappedTypeOf(resolved.typeName))
                return
              }
            }

            while (firstName.type !== "Identifier") {
              firstName = firstName.left
            }
            if (state.typeReferences.imports[firstName.name]) {
              path.replaceWith(wrappedTypeOf(resolved.typeName))
              return
            }
          }
          path.replaceWith(resolved)
        }
      }
    },
    exit(path, state) {
      const typeOfType = path.node.argument as any
      if (t.isTSUndefinedKeyword(typeOfType)) {
        path.replaceWith(typeOfType)
        return
      }
      t.assertTSTypeReference(typeOfType)
      if (isClass(typeOfType, path.scope)) {
        path.replaceWith(typeOfType)
        return
      }
      path.replaceWith(wrappedTypeOf(typeOfType.typeName))
    },
  },
}
