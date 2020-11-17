import { types as t, traverse } from "@babel/core"

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

export function applyImportsForTypeReferencesTransform(
  programNode: t.Program,
  packagesAndTypes: Record<string, string[]>
): void {
  const seenTypes = new Set<string>()
  const availableTypes = new Set<string>()
  Object.keys(packagesAndTypes).forEach((packages) => {
    packagesAndTypes[packages].forEach((type) => availableTypes.add(type))
  })
  traverse(programNode, {
    TSTypeReference: {
      exit(path) {
        const typeName = path.node.typeName
        if (t.isIdentifier(typeName) && availableTypes.has(typeName.name)) {
          seenTypes.add(typeName.name)
        }
      },
    },
  })
  programNode.body.unshift(...emitImportsForTypes(packagesAndTypes, seenTypes))
}
