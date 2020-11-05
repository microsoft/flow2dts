import { types as t } from "@babel/core"

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
