import { types as t } from "@babel/core"

export interface ReferenceRecord {
  variable: t.DeclareVariable
  original: t.Identifier | t.QualifiedTypeIdentifier
  resolved: t.TSEntityName | null
}

export interface RecognizedTypeReferences {
  records: { [key: string]: ReferenceRecord }
}

export function isRecognized(typeReferences: RecognizedTypeReferences, variable: t.DeclareVariable): boolean {
  return typeReferences.records[variable.id.name]?.variable === variable
}
