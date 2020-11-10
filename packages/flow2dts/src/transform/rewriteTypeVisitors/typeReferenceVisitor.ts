import { Visitor, types as t } from "@babel/core"
import { isPolyFilledType } from "../polyfillTypes"
import { State } from "../state"
import { assertTSType, wrappedTypeOf } from "../utilities"
import { resolveGenericTypeAnnotation } from "../typeReferenceResolver"

function convertQID(input: t.Identifier | t.QualifiedTypeIdentifier): t.Identifier | t.TSQualifiedName {
  if (input.type === "Identifier") {
    return t.identifier(input.name)
  } else {
    return t.tsQualifiedName(convertQID(input.qualification), t.identifier(input.id.name))
  }
}

export const typeReferenceVisitor: Visitor<State> = {
  GenericTypeAnnotation: {
    exit(path, state) {
      const resolved = resolveGenericTypeAnnotation(state.typeReferences, path, path.node)
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
        } else if (name === "Array" && typeParameters) {
          if (typeParameters.length !== 1) {
            throw new Error(
              `Array must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.replaceWith(t.tsArrayType(typeParameters[0]))
        } else if (name === "$ReadOnlyArray") {
          if (!typeParameters || typeParameters.length !== 1) {
            throw new Error(
              `$ReadOnlyArray must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.replaceWith(
            t.tsTypeReference(t.identifier("ReadonlyArray"), t.tsTypeParameterInstantiation(typeParameters))
          )
        } else if (name === "$ReadOnly") {
          if (!typeParameters || typeParameters.length !== 1) {
            throw new Error(
              `$ReadOnly must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.replaceWith(t.tsTypeReference(t.identifier("Readonly"), t.tsTypeParameterInstantiation(typeParameters)))
        } else {
          if (isPolyFilledType(name)) {
            state.polyfillTypes.add(name)
          }
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
        const resolved = resolveGenericTypeAnnotation(state.typeReferences, path, typeQueryOperator)
        if (resolved) {
          path.replaceWith(resolved)
        }
      }
    },
    exit(path, state) {
      const typeQueryOperator = path.node.argument as any
      t.assertTSTypeReference(typeQueryOperator)
      t.assertIdentifier(typeQueryOperator.typeName)
      const referencePath = path.scope.getBinding(typeQueryOperator.typeName.name)
      if (!referencePath) {
        throw new Error("invariant: expected referred to type to exist")
      }
      path.replaceWith(wrappedTypeOf(typeQueryOperator.typeName, state))
    },
  },
}
