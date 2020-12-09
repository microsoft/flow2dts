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
}

export interface HintDecl extends HintIdentifier {
  type: "type" | "value" | "class"
}

export interface HintFile {
  imports: { [key: string]: HintImport }
  decls: HintDecl[]
}
