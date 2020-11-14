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
  describe("concerning type alias declarations", () => {
    it("overrides type alias declarations", () => {
      expect(
        applyOverrides({
          input: `
            type X = number;
            type Y = string;
            type Z = boolean;
          `,
          overrides: `
            type X = string;
            type Z<X> = undefined;
          `,
        })
      ).toMatchInlineSnapshot(`
        "type X = string;
        type Y = string;
        type Z<X> = boolean;"
      `)
    })

    it("uses the old implementation when it is undefined in the override", () => {
      expect(
        applyOverrides({
          input: `
            type Z = boolean;
          `,
          overrides: `
            type Z<X> = undefined;
          `,
        })
      ).toMatchInlineSnapshot(`"type Z<X> = boolean;"`)
    })
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

  it("replaces class generics", () => {
    expect(
      applyOverrides({
        input: `
          declare class Foo<X extends string, Y extends string, Z extends boolean = false> extends Bar<X, Y, Z> {}
        `,
        overrides: `
          declare class Foo<Y extends number = 42> {}
        `,
      })
    ).toMatchInlineSnapshot(
      `"declare class Foo<X extends string, Y extends number = 42, Z extends boolean = false> extends Bar<X, Y, Z> {}"`
    )
  })
})
