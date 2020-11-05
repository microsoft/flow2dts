import { PluginObj, PluginPass, Visitor } from "@babel/core"
import { primitiveTypeVisitor } from "./primitiveTypeVisitor"
import { advancedTypeVisitor } from "./advancedTypeVisitor"
import { objectTypeVisitor } from "./objectTypeVisitor"
import { declarationVisitor } from "./declarationVisitor"
import { importVisitor } from "./importVisitor"
import { typeOperatorVisitor } from "./typeOperatorVisitor"

export function transform(): PluginObj {
  return {
    name: "flow2dtsTransform",
    visitor: {
      ...primitiveTypeVisitor,
      ...advancedTypeVisitor,
      ...objectTypeVisitor,
      ...declarationVisitor,
      ...importVisitor,
      ...typeOperatorVisitor,
    },
  }
}
