import { PluginPass, Visitor, types as t } from "@babel/core"
import { assertTSType } from "./utilities"

export const exportVisitor: Visitor<PluginPass> = {
  DeclareModuleExports: {
    exit(path) {
      const typeAnnotation = path.node.typeAnnotation.typeAnnotation
      assertTSType(typeAnnotation)
      const id = t.identifier("$defaultExportValue")
      id.typeAnnotation = t.tsTypeAnnotation(typeAnnotation)
      path.replaceWithMultiple([
        t.variableDeclaration("const", [t.variableDeclarator(id)]),
        t.exportDefaultDeclaration(id),
      ])
    },
  },
}
