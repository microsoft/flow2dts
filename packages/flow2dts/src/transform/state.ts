// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor } from "@babel/core"
import { RecognizedTypeReferences } from "./typeReferenceResolver"
// "flow2hint" does't work, I guess because there is no generated .d.ts files
import { ResolvedHintFile } from "../../../flow2hint/src/hintfile"

export interface State {
  typeReferences: RecognizedTypeReferences
  importToExport: Set<string>
  hintFile?: ResolvedHintFile
}

export function initializeState(state: State, hintFile: ResolvedHintFile | undefined): void {
  state.typeReferences = { records: {}, imports: {}, exports: {} }
  state.importToExport = new Set<string>()
  state.hintFile = hintFile
}

export function combineVisitorsSafe(...visitors: Visitor<State>[]): Visitor<State> {
  const combined: Visitor<State> = {}
  for (const visitor of visitors) {
    const k1 = Object.keys(combined)
    const k2 = Object.keys(visitor)
    for (const f1 of k1) {
      if (k2.includes(f1)) {
        throw new Error(`${f1} has already been defined in other visitors.`)
      }
    }
    Object.assign(combined, visitor)
  }
  return combined
}

export { isVariableDiscardable } from "./typeReferenceResolver"
export {
  ResolvedHintEntries,
  ResolvedHintFile,
  ResolvedHintImport,
  ResolvedHintTypeof,
} from "../../../flow2hint/src/hintfile"
