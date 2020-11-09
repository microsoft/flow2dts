import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { assertTSType, nameForParameter, nameForRestParameter } from "../utilities"

export const advancedTypeVisitor: Visitor<State> = {
  TupleTypeAnnotation: {
    exit(path) {
      path.node.types.forEach(assertTSType)
      path.replaceWith(t.tsTupleType(<t.TSType[]>(<unknown>path.node.types)))
    },
  },
  UnionTypeAnnotation: {
    exit(path) {
      path.node.types.forEach(assertTSType)
      path.replaceWith(t.tsUnionType(<t.TSType[]>(<unknown>path.node.types)))
    },
  },
  IntersectionTypeAnnotation: {
    exit(path) {
      path.node.types.forEach(assertTSType)
      path.replaceWith(t.tsIntersectionType(<t.TSType[]>(<unknown>path.node.types)))
    },
  },
  NullableTypeAnnotation: {
    exit(path) {
      const type = path.node.typeAnnotation
      assertTSType(type)
      path.replaceWith(t.tsUnionType([t.tsNullKeyword(), t.tsUndefinedKeyword(), type]))
    },
  },
  FunctionTypeAnnotation: {
    exit(path) {
      const { returnType, params, rest, typeParameters } = path.node
      if (typeParameters) t.assertTSTypeParameterDeclaration(typeParameters)
      assertTSType(returnType)

      const args: (t.Identifier | t.RestElement)[] = params.map((flowParam, index) => {
        const arg = t.identifier(flowParam.name === null ? nameForParameter(index) : flowParam.name.name)
        assertTSType(flowParam.typeAnnotation)
        arg.typeAnnotation = t.tsTypeAnnotation(flowParam.typeAnnotation)
        arg.optional = flowParam.optional
        return arg
      })

      if (rest !== null) {
        assertTSType(rest.typeAnnotation)
        const rarg = t.restElement(t.identifier(rest.name === null ? nameForRestParameter : rest.name.name))
        rarg.typeAnnotation = t.tsTypeAnnotation(rest.typeAnnotation)
        args.push(rarg)
      }

      path.replaceWith(t.tsFunctionType(typeParameters, args, t.tsTypeAnnotation(returnType)))
    },
  },
}
