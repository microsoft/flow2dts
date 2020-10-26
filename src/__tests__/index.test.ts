import { flow2dtsTransform } from "../"

import pluginTester from "babel-plugin-tester"
import path from "path"

pluginTester({
  plugin: flow2dtsTransform,
  fixtures: path.join(__dirname, "__fixtures__"),
  // fixtureOutputExt: ".d.ts", // FIXME: This is not picked up, instead it writes out a output.js file
  babelOptions: {
    plugins: ["@babel/plugin-syntax-flow"],
  },
})
