import { types as t } from "@babel/core"
import { parse } from "@babel/parser"
import generate from "@babel/generator"

import { applyOverridesVisitors, OverridesVisitor } from "../applyOverridesVisitors"

const overridesVisitors: OverridesVisitor[] = [
  [
    "**/*",
    {
      TSTypeAliasDeclaration: {
        exit(path) {
          if (path.node.id.name === "X") {
            path.node.typeAnnotation = t.tsStringKeyword()
          }
        },
      },
    },
  ],
  [
    "/path/to/b.d.ts",
    {
      TSTypeAliasDeclaration: {
        exit(path) {
          if (path.node.id.name === "Y") {
            path.node.typeAnnotation = t.tsStringKeyword()
          }
        },
      },
    },
  ],
]

function applyOverrides(filename: string, input: string) {
  const fileNode = parse(input, {
    sourceType: "module",
    plugins: ["typescript"],
  })
  applyOverridesVisitors(filename, fileNode, overridesVisitors)
  return generate(fileNode).code
}

describe("overrideDeclarationVisitor", () => {
  it("applies the all visitor to all files", () => {
    expect(
      applyOverrides(
        "/path/to/a.d.ts",
        `
          type X = number
        `
      )
    ).toMatchInlineSnapshot(`"type X = string;"`)
    expect(
      applyOverrides(
        "/path/to/b.d.ts",
        `
          type X = number
        `
      )
    ).toMatchInlineSnapshot(`"type X = string;"`)
  })

  it("applies file specific visitors", () => {
    expect(
      applyOverrides(
        "/path/to/a.d.ts",
        `
          type Y = number
        `
      )
    ).toMatchInlineSnapshot(`"type Y = number;"`)
    expect(
      applyOverrides(
        "/path/to/b.d.ts",
        `
          type Y = number
        `
      )
    ).toMatchInlineSnapshot(`"type Y = string;"`)
  })
})
