import { traverse } from "@babel/core"
import { parse as _parse } from "@babel/parser"
import generate from "@babel/generator"
// @ts-ignore
import pluginSyntaxTypeScript from "@babel/plugin-syntax-typescript"

import { applyImportsForTypeReferencesTransform } from "../applyImportsForTypeReferencesTransform"

function parse(code: string) {
  return _parse(code, {
    sourceType: "module",
    plugins: ["typescript"],
  })
}

function applyImports(options: { input: string; packagesAndTypes: Record<string, string[]> }) {
  const input = parse(options.input)
  applyImportsForTypeReferencesTransform(input.program, options.packagesAndTypes)
  return generate(input).code
}

describe(applyImportsForTypeReferencesTransform, () => {
  it("emits imports for seen type references", () => {
    expect(
      applyImports({
        input: `
          type Foo = X;
          type Bar = Y;
          type Baz = Z;
          `,
        packagesAndTypes: {
          xy: ["X", "Y"],
          z: ["Z"],
        },
      })
    ).toMatchInlineSnapshot(`
      "import { X, Y } from \\"xy\\";
      import { Z } from \\"z\\";
      type Foo = X;
      type Bar = Y;
      type Baz = Z;"
    `)
  })
})
