import {
  HintImport,
  HintDecl,
  ResolvedHintEntries,
  ResolvedHintFile,
  ResolvedHintImport,
  ResolvedHintTypeof,
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

function resolveImport<T extends ResolvedHintImport>(
  collectedHintFiles: HintFileEntries,
  hintImport: HintImport,
  callback: (type: ResolvedHintImport["type"], resolvedDecl?: HintDecl) => T
): T {
  if (!hintImport.resolved) {
    return callback("unresolved[error]")
  } else if (hintImport.resolved.fromLibrary) {
    return callback("unresolved[library]")
  } else {
    const resolved = hintImport.resolved
    const resolvedHintFile = collectedHintFiles[resolved.file]
    if (!resolvedHintFile) {
      return callback("unresolved[missing]")
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
        return callback("unresolved[missing]")
      } else {
        return callback(lastDeclBeforeResolved.type, lastDeclBeforeResolved)
      }
    }
  }
}

export function mergeHint(collectedHintFiles: HintFileEntries): ResolvedHintEntries {
  const mergedEntries: ResolvedHintEntries = { files: {} }
  for (const fileKey in collectedHintFiles) {
    const hintFile = collectedHintFiles[fileKey]
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
