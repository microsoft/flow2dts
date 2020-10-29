import { PluginPass, Visitor, types as t } from "@babel/core"
import { assertTSType } from "./utilities"

export const declarationVisitor: Visitor<PluginPass> = {
  TypeAlias: {
    exit(path) {
      const { id, typeParameters, right } = path.node
      if (typeParameters !== null) {
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
