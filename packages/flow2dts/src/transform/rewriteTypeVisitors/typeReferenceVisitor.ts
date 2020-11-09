import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { assertTSType, nameForParameter, nameForRestParameter } from "../utilities"

function convertQID(input: t.Identifier | t.QualifiedTypeIdentifier): t.Identifier | t.TSQualifiedName {
  if (input.type === "Identifier") {
    return t.identifier(input.name)
  } else {
    return t.tsQualifiedName(convertQID(input.qualification), t.identifier(input.id.name))
  }
}

export const typeReferenceVisitor: Visitor<State> = {
  GenericTypeAnnotation: {
    exit(path) {
      if (path.node.id.type === "Identifier") {
        const name = path.node.id.name
        const args = path.node.typeParameters

        if (name === "undefined") {
          path.replaceWith(t.tsUndefinedKeyword())
        } else if (name === "Array" && args) {
          if (args.params.length !== 1) {
            throw new Error(
              `Array must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.replaceWith(t.tsArrayType(<t.TSType>(<unknown>args.params[0])))
        } else if (name === "$ReadOnlyArray") {
          if (!args || args.params.length !== 1) {
            throw new Error(
              `$ReadOnlyArray must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.replaceWith(
            t.tsTypeReference(
              t.identifier("ReadonlyArray"),
              t.tsTypeParameterInstantiation([<t.TSType>(<unknown>args.params[0])])
            )
          )
        } else if (name === "$ReadOnly") {
          if (!args || args.params.length !== 1) {
            throw new Error(
              `$ReadOnly must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          path.replaceWith(
            t.tsTypeReference(
              t.identifier("Readonly"),
              t.tsTypeParameterInstantiation([<t.TSType>(<unknown>args.params[0])])
            )
          )
        } else if (name === "$Keys") {
          if (!args || args.params.length !== 1) {
            throw new Error(
              `$Keys must have exactly one type argument:\r\n${JSON.stringify(path.node.id, undefined, 4)}`
            )
          }
          const sourceType = args.params[0]
          assertTSType(sourceType)
          const keyofOperator = t.tsTypeOperator(sourceType)
          keyofOperator.operator = "keyof" // FIXME: Seems weird to have to define this
          path.replaceWith(keyofOperator)
        } else {
          path.replaceWith(t.tsTypeReference(t.identifier(name)))
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
}
