import { traverse } from "@babel/core"
import { parse as _parse } from "@babel/parser"
import generate from "@babel/generator"
// @ts-ignore
import pluginSyntaxTypeScript from "@babel/plugin-syntax-typescript"

import { createOverrideDeclarationVisitor, Options } from "../overrideDeclarationsVisitor"

function parse(code: string) {
  return _parse(code, {
    sourceType: "module",
    plugins: ["typescript"],
  })
}

function applyOverrides(options: { input: string; overrides: string }) {
  const input = parse(options.input)
  const overrides = parse(options.overrides)
  traverse(input, createOverrideDeclarationVisitor({ overrides }), undefined, {})
  return generate(input).code
}

describe("overrideDeclarationVisitor", () => {
  it("overrides type alias declarations", () => {
    expect(
      applyOverrides({
        input: `
          type X = number;
          type Y = string;
        `,
        overrides: `
          type X = string;
        `,
      })
    ).toMatchInlineSnapshot(`
      "type X = string;
      type Y = string;"
    `)
  })

  it("replaces interface generics", () => {
    expect(
      applyOverrides({
        input: `
          type X = number;
          interface Y<T> {
            foo: number
          }
        `,
        overrides: `
          interface Y<T extends string | number> {}
        `,
      })
    ).toMatchInlineSnapshot(`
      "type X = number;
      interface Y<T extends string | number> {
        foo: number;
      }"
    `)
  })
})
