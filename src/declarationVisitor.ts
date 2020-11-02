import { PluginPass, Visitor, types as t } from "@babel/core"
import { assertTSType } from "./utilities"

export const declarationVisitor: Visitor<PluginPass> = {
  TypeAlias: {
    exit(path) {
      const { id, typeParameters, right } = path.node
      if (typeParameters !== null && typeParameters !== undefined) {
        throw new Error("Generic type alias not supported yet.")
      }
      assertTSType(right)
      const newAst = t.tsTypeAliasDeclaration(id, undefined, right)
      newAst.declare = true
      path.replaceWith(newAst)
    },
  },
  VariableDeclaration: {
    exit(path) {
      path.node.declare = true
      path.node.declarations.forEach((d) => {
        d.init = null
      })
    },
  },
  FunctionDeclaration: {
    exit(path) {
      const { id, returnType, params, typeParameters } = path.node
      if (typeParameters !== null && typeParameters !== undefined) {
        throw new Error("Generic function not supported yet.")
      }

      const returnTSType =
        returnType === null || returnType === undefined
          ? t.tsVoidKeyword()
          : (<t.TypeAnnotation>returnType).typeAnnotation
      assertTSType(returnTSType)

      const args: (t.Identifier | t.RestElement)[] = params.map((flowParam, index) => {
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

      const newAst = t.tsDeclareFunction(id, null, args, t.tsTypeAnnotation(returnTSType))
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

      const args: (t.Identifier | t.RestElement)[] = params.map((flowParam, index) => {
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
