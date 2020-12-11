// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t, NodePath } from "@babel/core"
import { State } from "../state"
import { assertTSType, nameForParameter, nameForRestParameter } from "../utilities"

export const advancedTypeVisitor: Visitor<State> = {
  ArrayTypeAnnotation: {
    exit(path) {
      const elementType = path.node.elementType as any
      assertTSType(elementType)
      path.replaceWith(t.tsArrayType(elementType))
    },
  },
  TupleTypeAnnotation: {
    exit(path) {
      const types = path.node.types.map((type: any) => {
        assertTSType(type)
        return type
      })
      path.replaceWith(t.tsTupleType(types))
    },
  },
  UnionTypeAnnotation: {
    exit(path) {
      const types = path.node.types.map((type: any) => {
        assertTSType(type)
        return type
      })
      path.replaceWith(t.tsUnionType(types))
    },
  },
  IntersectionTypeAnnotation: {
    exit(path) {
      const types = path.node.types.map((type: any) => {
        assertTSType(type)
        return type
      })
      path.replaceWith(t.tsIntersectionType(types))
    },
  },
  FunctionTypeAnnotation: {
    enter(path) {
      explicitlyMarkNullableParamAsOptional(path)
    },
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
  NullableTypeAnnotation: {
    exit(path) {
      const type = path.node.typeAnnotation as any
      assertTSType(type)
      path.replaceWith(t.tsUnionType([t.tsNullKeyword(), t.tsUndefinedKeyword(), type]))
    },
  },
  // We don't actually rewrite the function declaration here, but record on the param node that params with a nullable
  // type annotation can semantically be considered optional. This information is needed later on when we actually
  // rewrite the function declaration.
  Function: {
    enter(path) {
      explicitlyMarkNullableParamAsOptional(path)
    },
  },
}

function explicitlyMarkNullableParamAsOptional(path: NodePath<t.Function> | NodePath<t.FunctionTypeAnnotation>) {
  path.node.params.forEach((param: t.Node) => {
    if (
      (t.isIdentifier(param) &&
        t.isTypeAnnotation(param.typeAnnotation) &&
        t.isNullableTypeAnnotation(param.typeAnnotation.typeAnnotation)) ||
      (t.isFunctionTypeParam(param) && t.isNullableTypeAnnotation(param.typeAnnotation))
    ) {
      param.optional = true
    }
  })
}
