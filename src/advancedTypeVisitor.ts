import { PluginPass, Visitor, types as t } from "@babel/core"
import { assertTSType } from "./utilities"

export const advancedTypeVisitor: Visitor<PluginPass> = {
  TupleTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsTupleType(<t.TSType[]>(<unknown>path.node.types)))
    },
  },
  UnionTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsUnionType(<t.TSType[]>(<unknown>path.node.types)))
    },
  },
  IntersectionTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsIntersectionType(<t.TSType[]>(<unknown>path.node.types)))
    },
  },
  GenericTypeAnnotation: {
    exit(path) {
      if (path.node.id.type === "Identifier") {
        const name = path.node.id.name
        const args = path.node.typeParameters
        if (name === "undefined") {
          path.replaceWith(t.tsUndefinedKeyword())
        } else if (name === "Array" && args) {
          path.replaceWith(t.tsArrayType(<t.TSType>(<unknown>args.params[0])))
        } else if (name === "$ReadOnlyArray" && args) {
          path.replaceWith(
            t.tsTypeReference(
              t.identifier("ReadonlyArray"),
              t.tsTypeParameterInstantiation([<t.TSType>(<unknown>args.params[0])])
            )
          )
        } else {
          path.replaceWith(t.tsTypeReference(t.identifier(name)))
        }
      } else {
        // QualifiedTypeIdentifier -> QualifiedName
        throw "QualifiedTypeIdentifier not supported yet"
      }
    },
  },
  FunctionTypeAnnotation: {
    exit(path) {
      const { returnType, params, rest, typeParameters } = path.node
      if (typeParameters !== null) {
        throw new Error("Generic type alias not supported yet.")
      }

      assertTSType(returnType)

      const args: (t.Identifier | t.RestElement)[] = params.map((flowParam, index) => {
        const arg = t.identifier(flowParam.name === null ? `$${index}` : flowParam.name.name)
        assertTSType(flowParam.typeAnnotation)
        arg.typeAnnotation = t.tsTypeAnnotation(flowParam.typeAnnotation)
        arg.optional = flowParam.optional
        return arg
      })

      if (rest !== null) {
        assertTSType(rest.typeAnnotation)
        const rarg = t.restElement(t.identifier(rest.name === null ? "$$" : rest.name.name))
        rarg.typeAnnotation = t.tsTypeAnnotation(rest.typeAnnotation)
        args.push(rarg)
      }

      path.replaceWith(t.tsFunctionType(null, args, t.tsTypeAnnotation(returnType)))
    },
  },
}
