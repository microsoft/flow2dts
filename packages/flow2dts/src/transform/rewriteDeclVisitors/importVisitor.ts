import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { nameForImportTypeof, wrappedTypeOf } from "../utilities"

export const importVisitor: Visitor<State> = {
  ImportDeclaration: {
    exit(path, state) {
      if (path.node.importKind === "typeof") {
        const names: string[] = []
        for (const id of path.node.specifiers) {
          switch (id.type) {
            case "ImportDefaultSpecifier":
            case "ImportSpecifier": {
              names.push(id.local.name)
              id.local.name = nameForImportTypeof(id.local.name)
              break
            }
          }
        }
        path.node.importKind = "value"

        const decls = names.map((name) => {
          const decl = t.tsTypeAliasDeclaration(
            t.identifier(name),
            null,
            wrappedTypeOf(t.identifier(nameForImportTypeof(name)), state)
          )
          decl.declare = true
          return decl
        })
        path.replaceWithMultiple([path.node, ...decls])
      } else if (path.node.importKind === "type") {
        const specifierIndex = path.node.specifiers.findIndex((specifier) => t.isImportDefaultSpecifier(specifier))
        if (specifierIndex >= 0) {
          const specifier = path.node.specifiers[specifierIndex] as t.ImportDefaultSpecifier

          const name = specifier.local.name
          specifier.local.name = nameForImportTypeof(name)
          const decl = t.tsTypeAliasDeclaration(
            t.identifier(name),
            null,
            wrappedTypeOf(t.identifier(nameForImportTypeof(name)), state)
          )
          decl.declare = true

          const defaultImportDeclaration = t.importDeclaration([specifier], path.node.source)
          path.insertBefore([defaultImportDeclaration, decl])

          path.node.specifiers.splice(specifierIndex, 1)
          if (path.node.specifiers.length === 0) {
            path.remove()
          }
        }
      } else {
        path.node.importKind = "value"
      }
    },
  },
}
