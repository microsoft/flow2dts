import { PluginPass, Visitor, types as t } from "@babel/core"

export const importVisitor: Visitor<PluginPass> = {
  ImportDeclaration: {
    exit(path) {
      if (path.node.importKind === "typeof") {
        const names: string[] = []
        for (const id of path.node.specifiers) {
          switch (id.type) {
            case "ImportDefaultSpecifier":
            case "ImportSpecifier": {
              names.push(id.local.name)
              id.local.name += "$f2tTypeof"
              break
            }
          }
        }
        path.node.importKind = "value"

        const decls = names.map((name) => {
          const decl = t.tsTypeAliasDeclaration(
            t.identifier(name),
            null,
            t.tsTypeQuery(t.identifier(`${name}$f2tTypeof`))
          )
          decl.declare = true
          return decl
        })
        path.replaceWithMultiple([path.node, ...decls])
      } else {
        path.node.importKind = "value"
      }
    },
  },
}
