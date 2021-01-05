import { traverse } from "@babel/core"
import { parse } from "@babel/parser"
import generate from "@babel/generator"

import { typeReferenceVisitor } from "../typeReferenceVisitor"
import { State } from "../../state"
import dedent from "dedent"

expect.addSnapshotSerializer({
  test: (val) => typeof val === "string",
  print: (val) => (typeof val === "string" ? val : JSON.stringify(val)),
})

function applyVisitor({ input, ...state }: { input: string } & State) {
  const ast = parse(input, {
    sourceType: "module",
    plugins: ["flow"],
  })
  traverse<State>(ast, typeReferenceVisitor, undefined, state)
  return generate(ast).code
}

describe("typeReferenceVisitor", () => {
  it("calls typeof on a value used in a qualified identifier expression", () => {
    expect(
      applyVisitor({
        input: dedent`
          declare var VirtualizedList: typeof $2;
          const $2 = require("./VirtualizedList");
          type DefaultProps = {|...typeof VirtualizedList.defaultProps,|};
        `,
        typeReferences: {
          records: {},
          imports: {},
          exports: {},
        },
        hintFile: {
          imports: {},
          typeofs: {
            defaultProps: [
              {
                type: "value",
                row: 3,
                column: 49,
              },
            ],
          },
        },
      })
    ).toMatchInlineSnapshot(`
      declare var VirtualizedList: $2;

      const $2 = require("./VirtualizedList");

      type DefaultProps = {| ...typeof VirtualizedList.defaultProps
      |};
    `)
  })

  it("calls typeof on a class used in a qualified identifier expression", () => {
    expect(
      applyVisitor({
        input: dedent`
          const VirtualizedList = require("./VirtualizedList");
          type DefaultProps = {|...typeof VirtualizedList.defaultProps,|};
        `,
        typeReferences: {
          records: {},
          imports: {},
          exports: {},
        },
        hintFile: {
          imports: {},
          typeofs: {
            defaultProps: [
              {
                type: "value",
                row: 2,
                column: 49,
              },
            ],
          },
        },
      })
    ).toMatchInlineSnapshot(`
      const VirtualizedList = require("./VirtualizedList");

      type DefaultProps = {| ...typeof VirtualizedList.defaultProps
      |};
    `)
  })
})
