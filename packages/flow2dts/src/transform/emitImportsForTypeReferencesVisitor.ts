import { types as t, Visitor } from "@babel/core"

function emitImportsForTypes(packagesAndTypes: Record<string, string[]>, typeNames: Set<string>) {
  const result: t.ImportDeclaration[] = []
  Object.keys(packagesAndTypes).forEach((packageName) => {
    const packageTypeNames = packagesAndTypes[packageName]
    const importTypes = Array.from(typeNames).filter((typeName) => packageTypeNames.includes(typeName))
    if (importTypes.length > 0) {
      result.push(
        t.importDeclaration(
          importTypes.sort().map((typeName) => t.importSpecifier(t.identifier(typeName), t.identifier(typeName))),
          t.stringLiteral(packageName)
        )
      )
    }
  })
  return result
}

const visitor: Visitor<{
  packagesAndTypes: Record<string, string[]>
  seenTypes: Set<string>
  availableTypes: Set<string>
}> = {
  Program: {
    enter(_, state) {
      state.seenTypes = new Set()
      state.availableTypes = new Set()
      Object.keys(state.packagesAndTypes).forEach((packages) => {
        state.packagesAndTypes[packages].forEach((type) => state.availableTypes.add(type))
      })
    },
    exit(path, state) {
      path.node.body.unshift(...emitImportsForTypes(state.packagesAndTypes, state.seenTypes))
    },
  },
  TSTypeReference: {
    exit(path, state) {
      const typeName = path.node.typeName
      if (t.isIdentifier(typeName) && state.availableTypes.has(typeName.name)) {
        state.seenTypes.add(typeName.name)
      }
    },
  },
}

export const emitImportsForTypeReferencesVisitor = visitor as Visitor<{ packagesAndTypes: Record<string, string[]> }>
