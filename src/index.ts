import { PluginObj, PluginPass, Visitor } from "@babel/core"
import { primitiveTypeVisitor } from "./primitiveTypeVisitor"
import { advancedTypeVisitor } from "./advancedTypeVisitor"
import { objectTypeVisitor } from "./objectTypeVisitor"
import { declarationVisitor } from "./declarationVisitor"
import { importVisitor } from "./importVisitor"

export function flow2dtsTransform(): PluginObj {
  const visitor: Visitor<PluginPass> = {}
  Object.assign(visitor, primitiveTypeVisitor)
  Object.assign(visitor, advancedTypeVisitor)
  Object.assign(visitor, objectTypeVisitor)
  Object.assign(visitor, declarationVisitor)
  Object.assign(visitor, importVisitor)

  return {
    name: flow2dtsTransform.name,
    visitor,
  }
}

export default flow2dtsTransform
