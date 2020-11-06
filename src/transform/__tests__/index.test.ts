import { transform } from "../"

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
  export default <expression>
  qualified name everywhere
  require
  static members
  utility types: https://flow.org/en/docs/types/utilities/
*/

const prettierConfig: prettier.Options = {
  ...prettier.resolveConfig.sync("output.d.ts"),
  filepath: "output.d.ts",
  parser: "typescript",
}

pluginTester({
  plugin: transform,
  fixtures: path.join(__dirname, "__fixtures__"),
  // FIXME: This is not picked up, instead it writes out a output.js file
  fixtureOutputExt: ".d.ts",
  babelOptions: {
    plugins: ["@babel/plugin-syntax-flow"],
  },
  // FIXME:
  // * Using the correct TS parser should be inferred from the fixtureOutputExt
  // * Some TS code, like that in src/__tests__/__fixtures__/generic-declarations/output.d.ts, formats differently when
  //   formatting multiple times. See https://github.com/prettier/prettier/issues/9570
  formatResult: (code, _options) => {
    while (true) {
      const before = code
      code = prettier.format(code, prettierConfig)
      if (code === before) {
        return code
      }
    }
  },
})
