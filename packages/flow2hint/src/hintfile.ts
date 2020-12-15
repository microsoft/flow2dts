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
  libraryFolder: number // -1: local file
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
  typeofs: HintImport[]
  decls: HintDecl[]
}

export interface ResolvedHintImport {
  /*
   library: resolved to library file but don't know what it is
   missing: resolved to local file but don't know what it is
   error: error while running `flow get-def`
   */
  type: "type" | "value" | "class" | "unresolved[library]" | "unresolved[missing]" | "unresolved[error]"
  resolvedDecl?: HintDecl
}

export interface ResolvedHintTypeof extends ResolvedHintImport, HintPos {}

export interface ResolvedHintFile {
  imports: { [key: string]: ResolvedHintImport }
  typeofs: { [key: string]: ResolvedHintTypeof[] }
}

export interface ResolvedHintEntries {
  libraries: string[]
  files: { [key: string]: ResolvedHintFile }
}
