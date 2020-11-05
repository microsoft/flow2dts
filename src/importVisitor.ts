import { PluginPass, Visitor, types as t } from "@babel/core"

export const importVisitor: Visitor<PluginPass> = {
  ImportDeclaration: {
    exit(path) {
      path.node.importKind = "value"
    },
  },
}
