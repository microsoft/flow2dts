import { HintDecl, ResolvedHintEntries, ResolvedHintFile } from "./hintfile"
import { HintFileEntries } from "./singleFlow2Hint"

function chooseLater(existing: HintDecl | undefined, comming: HintDecl): HintDecl {
  if (existing) {
    if (comming.row < existing.row) return comming
    if (comming.row === existing.row && comming.column < existing.column) return comming
    return existing
  } else {
    return comming
  }
}

export function mergeHint(collectedHintFiles: HintFileEntries): ResolvedHintEntries {
  const mergedEntries: ResolvedHintEntries = { files: {} }
  for (const fileKey in collectedHintFiles) {
    const hintFile = collectedHintFiles[fileKey]
    const mergedFile: ResolvedHintFile = { imports: {} }
    mergedEntries.files[fileKey] = mergedFile

    for (const importKey in hintFile.imports) {
      const hintImport = hintFile.imports[importKey]
      if (!hintImport.resolved) {
        mergedFile.imports[importKey] = { type: "unresolved[error]" }
      } else if (hintImport.resolved.fromLibrary) {
        mergedFile.imports[importKey] = { type: "unresolved[library]" }
      } else {
        const resolved = hintImport.resolved
        const resolvedHintFile = collectedHintFiles[resolved.file]
        if (!resolvedHintFile) {
          mergedFile.imports[importKey] = { type: "unresolved[missing]" }
        } else {
          let lastDeclBeforeResolved: HintDecl | undefined
          for (const hintDecl of resolvedHintFile.decls) {
            if (hintDecl.row < resolved.begin.row) {
              lastDeclBeforeResolved = chooseLater(lastDeclBeforeResolved, hintDecl)
            } else if (hintDecl.row === resolved.begin.row && hintDecl.column <= resolved.begin.column) {
              lastDeclBeforeResolved = chooseLater(lastDeclBeforeResolved, hintDecl)
            } else {
              break
            }
          }
          if (!lastDeclBeforeResolved) {
            mergedFile.imports[importKey] = { type: "unresolved[missing]" }
          } else {
            mergedFile.imports[importKey] = { type: lastDeclBeforeResolved.type }
          }
        }
      }
    }
  }
  return mergedEntries
}
