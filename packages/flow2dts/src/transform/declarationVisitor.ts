import { Visitor, types as t } from "@babel/core"
import { State } from "."
import { assertTSType } from "./utilities"

function convertParameters(
  params: Array<t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty>
): (t.Identifier | t.RestElement)[] {
  return params.map((flowParam, index) => {
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
        throw new Error("Pattern function parameters are not supported yet.")
      }
    }
  })
}

export const declarationVisitor: Visitor<State> = {
  TypeAlias: {
    exit(path) {
      const { id, typeParameters, right } = path.node
      if (typeParameters) t.assertTSTypeParameterDeclaration(typeParameters)
      assertTSType(right)
      const newAst = t.tsTypeAliasDeclaration(id, typeParameters, right)
      newAst.declare = true
      path.replaceWith(newAst)
    },
  },
  TypeParameterDeclaration: {
    exit(path) {
      let first = false
      path.replaceWith(
        t.tsTypeParameterDeclaration(
          path.node.params.map((flowParam) => {
            assertTSType(flowParam.bound?.typeAnnotation)
            assertTSType(flowParam.default)
            const newAst = t.tsTypeParameter(flowParam.bound?.typeAnnotation, flowParam.default, flowParam.name)

            if (flowParam.variance && !first) {
              first = true
              path.addComment("leading", "[FLOW2DTS - Warning] Covariance and contravariance are ignored.")
            }
            return newAst
          })
        )
      )
    },
  },
  VariableDeclaration: {
    exit(path) {
      const decl = path.node.declarations[0]
      if (path.node.kind === "const" && decl && decl.init && decl.init.type === "CallExpression" && decl.init) {
        const callee = decl.init.callee
        if (callee.type === "Identifier" && callee.name === "require" && decl.init.arguments.length === 1) {
          path.replaceWith(
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier((<t.Identifier>decl.id).name))],
              <t.StringLiteral>decl.init.arguments[0]
            )
          )
          return
        }
      }
      path.node.declare = true
      path.node.declarations.forEach((d) => {
        d.init = null
      })
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

      const args = convertParameters(params)

      const newAst = t.tsDeclareFunction(id, typeParameters, args, t.tsTypeAnnotation(returnTSType))
      newAst.declare = true
      path.replaceWith(newAst)
    },
  },
  ClassProperty: {
    exit(path) {
      path.node.value = null
    },
  },
  ClassMethod: {
    exit(path) {
      const { kind, key, returnType, params, typeParameters } = path.node
      if (typeParameters !== null && typeParameters !== undefined) {
        throw new Error("Generic function not supported yet.")
      }

      const returnTSType =
        returnType === null || returnType === undefined
          ? kind === "method"
            ? t.tsVoidKeyword()
            : null
          : (<t.TypeAnnotation>returnType).typeAnnotation
      assertTSType(returnTSType)

      const args = convertParameters(params)

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
  ClassDeclaration: {
    exit(path) {
      path.node.declare = true
    },
  },
  OpaqueType: {
    exit(path) {
      path.addComment("leading", "[FLOW2DTS - Warning] This type alias was opaque in the original Flow source.")
      const { id, typeParameters, impltype } = path.node
      assertTSType(impltype)
      const newAst = t.tsTypeAliasDeclaration(id, undefined, impltype)
      newAst.declare = true
      path.replaceWith(newAst)
    },
  },
}
