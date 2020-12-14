export interface HintPos {
  row: number
  column: number
}

export interface HintIdentifier extends HintPos {
  local: string
}

export interface HintResolved {
  begin: HintPos
  end: HintPos
  fromLibrary: boolean
  file: string
}

export interface HintImport {
  source: HintIdentifier
  resolved?: HintResolved
  error?: string
}

export interface HintDecl extends HintIdentifier {
  type: "type" | "value" | "class"
}

export interface HintFile {
  imports: { [key: string]: HintImport }
  decls: HintDecl[]
}

export interface ResolvedHintImport {
  /*
   library: resolved to library files
   missing: resolved to local file but don't know what it is
   error: error while running `flow get-def`
   */
  type: "type" | "value" | "class" | "unresolved[library]" | "unresolved[missing]" | "unresolved[error]"
  resolvedDecl?: HintDecl
}

export interface ResolvedHintFile {
  imports: { [key: string]: ResolvedHintImport }
}

export interface ResolvedHintEntries {
  files: { [key: string]: ResolvedHintFile }
}
