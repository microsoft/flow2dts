import { flow2dtsTransform } from "../"

import pluginTester from "babel-plugin-tester"
import path from "path"
import prettier from "prettier"

/*
Tips:
  check flow input: https://astexplorer.net/
  check typescript output: https://www.typescriptlang.org/play
  flow manual: https://flow.org/en/docs/
  typescript manual: https://www.typescriptlang.org/docs/handbook/intro.html
*/

/*
test case todo:
  import
  export
  enum
  generic function
  generic call signature
  generic type alias
  generic class
  generic interface
  static members
  typeof EXPR
  utility types: https://flow.org/en/docs/types/utilities/
*/

const prettierConfig: prettier.Options = {
  ...prettier.resolveConfig.sync("output.d.ts"),
  filepath: "output.d.ts",
}

pluginTester({
  plugin: flow2dtsTransform,
  fixtures: path.join(__dirname, "__fixtures__"),
  // FIXME: This is not picked up, instead it writes out a output.js file
  fixtureOutputExt: ".d.ts",
  babelOptions: {
    plugins: ["@babel/plugin-syntax-flow"],
  },
  // FIXME: Using the correct TS parser should be inferred from the fixtureOutputExt
  formatResult: (code, _options) => {
    return prettier.format(code, prettierConfig)
  },
})
