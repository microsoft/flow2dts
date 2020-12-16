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
import { HintFileEntries } from "./singleFlow2Hint"

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
    return callback("unresolved[error]")
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
  HintFileLoop: for (const fileKey in collectedHintFiles.files) {
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
      mergedFile.imports[importKey] = resolveImport<ResolvedHintImport>(
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
    }

    for (const hintTypeof of hintFile.typeofs) {
      if (!mergedFile.typeofs[hintTypeof.source.local]) {
        mergedFile.typeofs[hintTypeof.source.local] = []
      }
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
  return mergedEntries
}
