// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t, NodePath } from "@babel/core"
import { State } from "../state"
import { assertTSType } from "../utilities"

function convertParameters(
  path: NodePath<any>,
  params: Array<t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty>
): (t.Identifier | t.RestElement)[] {
  return params.map((flowParam) => {
    switch (flowParam.type) {
      case "Identifier": {
        const paramType = (<t.TypeAnnotation>flowParam.typeAnnotation).typeAnnotation
        assertTSType(paramType)
        const arg = t.identifier(flowParam.name)
        arg.typeAnnotation = t.tsTypeAnnotation(paramType)
        arg.optional = flowParam.optional
        return arg
      }
      case "RestElement": {
        const paramId = <t.Identifier>flowParam.argument
        const paramType = (<t.TypeAnnotation>flowParam.typeAnnotation).typeAnnotation
        assertTSType(paramType)
        const rarg = t.restElement(t.identifier(paramId.name))
        rarg.typeAnnotation = t.tsTypeAnnotation(paramType)
        return rarg
      }
      default: {
        throw path.buildCodeFrameError("Pattern function parameters are not supported yet.")
      }
    }
  })
}

export const functionVisitor: Visitor<State> = {
  DeclareFunction: {
    exit(path) {
      const id = path.node.id
      t.assertTypeAnnotation(id.typeAnnotation)
      const functionType = id.typeAnnotation.typeAnnotation as any
      t.assertTSFunctionType(functionType)
      const declareFunction = t.tsDeclareFunction(
        id,
        functionType.typeParameters,
        functionType.parameters,
        functionType.typeAnnotation
      )
      declareFunction.declare = true // TODO: Seems superfluous to have to provide this
      path.replaceWith(declareFunction)
    },
  },
  FunctionDeclaration: {
    exit(path) {
      const { id, returnType, params, typeParameters } = path.node
      if (typeParameters) t.assertTSTypeParameterDeclaration(typeParameters)

      const returnTSType =
        returnType === null || returnType === undefined
          ? t.tsVoidKeyword()
          : (<t.TypeAnnotation>returnType).typeAnnotation
      assertTSType(returnTSType)

      const args = convertParameters(path, params)

      const newAst = t.tsDeclareFunction(id, typeParameters, args, t.tsTypeAnnotation(returnTSType))
      newAst.declare = true
      path.replaceWith(newAst)
    },
  },
  ClassMethod: {
    exit(path) {
      const { kind, key, returnType, params, typeParameters } = path.node
      if (typeParameters !== null && typeParameters !== undefined) {
        throw path.buildCodeFrameError("Generic function not supported yet.")
      }

      const returnTSType =
        returnType === null || returnType === undefined
          ? kind === "method"
            ? t.tsVoidKeyword()
            : null
          : (<t.TypeAnnotation>returnType).typeAnnotation
      assertTSType(returnTSType)

      const args = convertParameters(path, params)

      const newAst = t.tsDeclareMethod(
        null,
        key,
        null,
        args,
        returnTSType ? t.tsTypeAnnotation(returnTSType) : undefined
      )
      newAst.kind = path.node.kind
      newAst.access = path.node.access
      newAst.accessibility = path.node.accessibility
      path.replaceWith(newAst)
    },
  },
}
