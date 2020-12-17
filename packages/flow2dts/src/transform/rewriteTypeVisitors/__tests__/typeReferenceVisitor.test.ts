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
  it("works", () => {
    expect(
      applyVisitor({
        input: dedent`
          declare var VirtualizedList: typeof $2;
          const $2 = require("./VirtualizedList");
          type DefaultProps = {|
            ...typeof VirtualizedList.defaultProps,
          |};
        `,
        typeReferences: {
          records: {},
          imports: {},
          exports: {},
        },
        hintFile: {
          imports: {},
          typeofs: {},
        },
      })
    ).toMatchInlineSnapshot(`
      declare var VirtualizedList: $2;

      const $2 = require("./VirtualizedList");

      type DefaultProps = {| ...typeof VirtualizedList.defaultProps
      |};
    `)
  })
})
