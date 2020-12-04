import { PluginObj, traverse, types as t, transformFileAsync } from "@babel/core"
import * as babelParser from "@babel/parser"
import babelTraverse from "@babel/traverse"
import babelGenerator from "@babel/generator"
// @ts-ignore
import pluginSyntaxFlow from "@babel/plugin-syntax-flow"
import path from "path"
import fs from "fs"

export function pluginFlow2Hint(_api: unknown, _dirname: string): PluginObj<{}> {
  return {
    name: "flow2hintTransform",
    visitor: {},
  }
}

export async function convert({ filename, outFilename }: { filename: string; outFilename: string }): Promise<string> {
  /*
  const result = await transformFileAsync(filename, {
    plugins: [pluginSyntaxFlow, pluginFlow2Hint],
    sourceType: "module",
    parserOpts: {
      allowUndeclaredExports: true,
    },
  })
  const outData = result.code
  */
  const outData = "{}"

  await fs.promises.mkdir(path.dirname(outFilename), { recursive: true })
  await fs.promises.writeFile(outFilename, outData, "utf8")
  return outFilename
}
