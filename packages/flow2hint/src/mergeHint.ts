import {
  HintImport,
  HintDecl,
  HintFile,
  ResolvedHintEntries,
  ResolvedHintFile,
  ResolvedHintImport,
  ResolvedHintTypeof,
  HintResolved,
} from "./hintfile"
import { HintFileEntries, resolvedToItself } from "./singleFlow2Hint"

function chooseLater(existing: HintDecl | undefined, comming: HintDecl): HintDecl {
  if (existing) {
    if (comming.row > existing.row) return comming
    if (comming.row === existing.row && comming.column > existing.column) return comming
    return existing
  } else {
    return comming
  }
}

function resolveImportInternal<T extends ResolvedHintImport>(
  resolved: HintResolved,
  resolvedHintFile: HintFile | undefined,
  unresolvedType: ResolvedHintImport["type"],
  callback: (type: ResolvedHintImport["type"], resolvedDecl?: HintDecl) => T
): T {
  if (!resolvedHintFile) {
    return callback(unresolvedType)
  } else {
    let lastDeclBeforeResolved: HintDecl | undefined
    for (const hintDecl of resolvedHintFile.decls) {
      if (hintDecl.row < resolved.begin.row) {
        lastDeclBeforeResolved = chooseLater(lastDeclBeforeResolved, hintDecl)
      } else if (hintDecl.row === resolved.begin.row && hintDecl.column <= resolved.begin.column) {
        lastDeclBeforeResolved = chooseLater(lastDeclBeforeResolved, hintDecl)
      }
    }
    if (!lastDeclBeforeResolved) {
      return callback(unresolvedType)
    } else {
      return callback(lastDeclBeforeResolved.type, lastDeclBeforeResolved)
    }
  }
}

function resolveImport<T extends ResolvedHintImport>(
  collectedHintFiles: HintFileEntries,
  hintImport: HintImport,
  callback: (type: ResolvedHintImport["type"], resolvedDecl?: HintDecl) => T
): T {
  if (!hintImport.resolved) {
    if (
      hintImport.error &&
      hintImport.error.includes("Could not get definition for ") &&
      hintImport.error.includes("No possible types")
    ) {
      return callback("value")
    } else {
      return callback("unresolved[error]")
    }
  } else if (hintImport.resolved.libraryFolder !== -1) {
    const resolved = hintImport.resolved
    const resolvedHintFile =
      collectedHintFiles.files[collectedHintFiles.libraries[resolved.libraryFolder] + resolved.file]
    return resolveImportInternal<T>(hintImport.resolved, resolvedHintFile, "unresolved[library]", callback)
  } else {
    const resolved = hintImport.resolved
    const resolvedHintFile = collectedHintFiles.files[resolved.file]
    return resolveImportInternal<T>(hintImport.resolved, resolvedHintFile, "unresolved[missing]", callback)
  }
}

export function mergeHint(collectedHintFiles: HintFileEntries): ResolvedHintEntries {
  const mergedEntries: ResolvedHintEntries = { libraries: collectedHintFiles.libraries, files: {} }
  HintFileLoop: for (const fileKey of Object.keys(collectedHintFiles.files).sort()) {
    for (const libraryFolder of collectedHintFiles.libraries) {
      if (libraryFolder + "/" === fileKey.substr(0, libraryFolder.length + 1)) {
        continue HintFileLoop
      }
    }
    const hintFile = collectedHintFiles.files[fileKey]
    const mergedFile: ResolvedHintFile = { imports: {}, typeofs: {} }
    mergedEntries.files[fileKey] = mergedFile

    for (const importKey in hintFile.imports) {
      const hintImport = hintFile.imports[importKey]
      const resolvedHintImport = resolveImport<ResolvedHintImport>(
        collectedHintFiles,
        hintImport,
        (type, resolvedDecl?) => {
          if (resolvedDecl) {
            return { type, resolvedDecl }
          } else {
            return { type }
          }
        }
      )

      switch (resolvedHintImport.type) {
        case "unresolved[error]": {
          if (hintImport.isImportedType === true) {
            resolvedHintImport.type = "type[guess-import]"
          } else if (importKey === "React") {
            resolvedHintImport.type = "value[guess-import]"
          } else if (importKey === "Component") {
            resolvedHintImport.type = "type[guess-import]"
          }
          break
        }
        case "unresolved[missing]": {
          if (hintImport.isImportedType === true) {
            resolvedHintImport.type = "type[guess-import]"
          } else if (importKey[0].toLowerCase() === importKey[0] || importKey.toUpperCase() === importKey) {
            resolvedHintImport.type = "value[guess-import]"
          } else if (importKey[0].toUpperCase() === importKey[0]) {
            resolvedHintImport.type = "type[guess-import]"
          }
          break
        }
        case "unresolved[library]": {
          if (hintImport.isImportedType === true) {
            resolvedHintImport.type = "type[guess-import]"
          }
          break
        }
      }
      mergedFile.imports[importKey] = resolvedHintImport
    }

    for (const hintTypeof of hintFile.typeofs) {
      if (!mergedFile.typeofs[hintTypeof.source.local]) {
        mergedFile.typeofs[hintTypeof.source.local] = []
      }
      if (hintTypeof.error === "[TYPEOF RESOLVED TO ITSELF]") {
        const importKey = hintTypeof.source.local
        if (importKey[0].toLowerCase() === importKey[0] || importKey.toUpperCase() === importKey) {
          mergedFile.typeofs[hintTypeof.source.local].push({
            column: hintTypeof.source.column,
            row: hintTypeof.source.row,
            type: "value[guess-import]",
          })
        } else if (importKey[0].toUpperCase() === importKey[0]) {
          mergedFile.typeofs[hintTypeof.source.local].push({
            column: hintTypeof.source.column,
            row: hintTypeof.source.row,
            type: "type[guess-import]",
          })
        }
      } else {
        mergedFile.typeofs[hintTypeof.source.local].push(
          resolveImport<ResolvedHintTypeof>(collectedHintFiles, hintTypeof, (type, resolvedDecl?) => {
            if (resolvedDecl) {
              return { row: hintTypeof.source.row, column: hintTypeof.source.column, type, resolvedDecl }
            } else {
              return { row: hintTypeof.source.row, column: hintTypeof.source.column, type }
            }
          })
        )
      }
    }
  }
  return mergedEntries
}
