import { types as t } from "@babel/core"
import { parse } from "@babel/parser"
import generate from "@babel/generator"

import {
  applyOverridesVisitors,
  OverridesVisitor,
  initVisitorObjects,
  OverridesVisitorObject,
} from "../applyOverridesVisitors"

const visitors: OverridesVisitor[] = [
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

function applyVisitorsToInput(filename: string, input: string, visitorObjects: OverridesVisitorObject[]) {
  const fileNode = parse(input, {
    sourceType: "module",
    plugins: ["typescript"],
  })
  applyOverridesVisitors(filename, fileNode, visitorObjects)
  return fileNode
}

function transformInput(filename: string, input: string) {
  const visitorObjects = initVisitorObjects(visitors)
  const fileNode = applyVisitorsToInput(filename, input, visitorObjects)
  return generate(fileNode).code
}

describe("overrideDeclarationVisitor", () => {
  it("matches using globs", () => {
    expect(
      transformInput(
        "/path/to/a.d.ts",
        `
          type X = number
        `
      )
    ).toMatchInlineSnapshot(`"type X = string;"`)
    expect(
      transformInput(
        "/path/to/b.d.ts",
        `
          type X = number
        `
      )
    ).toMatchInlineSnapshot(`"type X = string;"`)
  })

  it("applies file specific visitors", () => {
    expect(
      transformInput(
        "/path/to/a.d.ts",
        `
          type Y = number
        `
      )
    ).toMatchInlineSnapshot(`"type Y = number;"`)
    expect(
      transformInput(
        "/path/to/b.d.ts",
        `
          type Y = number
        `
      )
    ).toMatchInlineSnapshot(`"type Y = string;"`)
  })

  it("keeps track of how often it matched", () => {
    let visitorObjects
    visitorObjects = initVisitorObjects(visitors)
    applyVisitorsToInput(
      "/path/to/a.d.ts",
      `
        type Y = number
      `,
      visitorObjects
    )
    expect(visitorObjects[0].madeChangesToNumberOfFiles).toEqual(0)
    expect(visitorObjects[1].madeChangesToNumberOfFiles).toEqual(0)
    visitorObjects = initVisitorObjects(visitors)
    applyVisitorsToInput(
      "/path/to/b.d.ts",
      `
        type Y = number
      `,
      visitorObjects
    )
    expect(visitorObjects[0].madeChangesToNumberOfFiles).toEqual(0)
    expect(visitorObjects[1].madeChangesToNumberOfFiles).toEqual(1)
  })
})
