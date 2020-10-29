import { PluginPass, Visitor, types as t } from "@babel/core"
import { assertTSType } from "./utilities"

export const declarationVisitor: Visitor<PluginPass> = {
  TypeAlias: {
    exit(path) {
      const { id, typeParameters, right } = path.node
      assertTSType(right)
      const newAst = t.tsTypeAliasDeclaration(id, undefined, right)
      newAst.declare = true
      path.replaceWith(newAst)
    },
  },
}
