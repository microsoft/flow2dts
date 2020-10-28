import { flow2dtsTransform } from "../"

import pluginTester from "babel-plugin-tester"
import path from "path"

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
  interface
  class
  generic function
  generic call signature
  generic type alias
  generic class
  generic interface
  typeof EXPR
  utility types: https://flow.org/en/docs/types/utilities/
*/

pluginTester({
  plugin: flow2dtsTransform,
  fixtures: path.join(__dirname, "__fixtures__"),
  // fixtureOutputExt: ".d.ts", // FIXME: This is not picked up, instead it writes out a output.js file
  babelOptions: {
    plugins: ["@babel/plugin-syntax-flow"],
  },
})
