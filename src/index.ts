import { PluginObj, PluginPass, Visitor, types as t } from "@babel/core"
import { assertTSType, assertTSTypeElement, assertTSTypeAnnotation } from "./utilities"
import { primitiveTypeVisitor } from "./primitiveTypeVisitor"
import { objectTypeVisitor } from "./objectTypeVisitor"
import { declarationVisitor } from "./declarationVisitor"

export function flow2dtsTransform(): PluginObj {
  const visitor: Visitor<PluginPass> = {}
  Object.assign(visitor, primitiveTypeVisitor)
  Object.assign(visitor, objectTypeVisitor)
  Object.assign(visitor, declarationVisitor)

  return {
    name: flow2dtsTransform.name,
    visitor,
  }
}

export default flow2dtsTransform
