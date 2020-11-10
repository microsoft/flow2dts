import { types as t } from "@babel/core"
import { State } from "./state"

export const nameForExportDefault = "$f2tExportDefault"
export const nameForRestParameter = "$f2tRest"
export const nameForTypeIndexerKey = "$f2tKey"

export function nameForImportTypeof(name: string): string {
  return `${name}$f2tTypeof`
}

export function nameForParameter(index: number): string {
  return `$f2t${index + 1}`
}

export function assertTSType(node: t.Node | null | undefined): asserts node is t.TSType {
  if (node != null && node != undefined && !t.isTSType(node)) {
    throw new Error(`${node.type}(node is not a TypeScript type:\r\n${JSON.stringify(node, undefined, 4)}`)
  }
}

export function assertTSTypeElement(node: t.Node | null | undefined): asserts node is t.TSTypeElement {
  t.assertTSTypeElement(node)
}

export function assertTSTypeAnnotation(node: t.Node | null | undefined): asserts node is t.TSTypeAnnotation {
  t.assertTSTypeAnnotation(node)
}

export function wrappedTypeOf(id: t.TSEntityName, state: State) {
  state.polyfillTypes.add("$TypeOf")
  return t.tsTypeReference(t.identifier("$TypeOf"), t.tsTypeParameterInstantiation([t.tsTypeQuery(id)]))
}
