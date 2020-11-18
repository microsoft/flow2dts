import { transformFileAsync } from "@babel/core"
import * as babelParser from "@babel/parser"
import babelTraverse from "@babel/traverse"
import babelGenerator from "@babel/generator"
import { State } from "./transform/state"
// @ts-ignore
import pluginSyntaxFlow from "@babel/plugin-syntax-flow"
import path from "path"
import fs from "fs"
import stripAnsi from "strip-ansi"

import { transform as pluginFlow2DTS, Options as PluginOptions } from "./transform"
import { OverridesVisitors } from "./transform/applyOverridesVisitors"

const regexFixPath = /^\[FLOW2DTS \- Error\] .*?[\\\/]workbench[\\\/]inputs[\\\/](?<path>.*?\.js\.flow):(?<message>.*)$/

function fixPathInOutput(outData: string): string {
  const lines = outData.split(/\r?\n/)
  if (lines.length === 0) return outData

  const match = lines[0].match(regexFixPath)
  if (match) {
    const fixedPath = "/" + match.groups?.path.replace(/\\/g, "/")
    lines[0] = `[FLOW2DTS \- Error\] ${fixedPath}:${match.groups?.message}`
  }
  return lines.join("\n")
}

async function getOverrides(overrideFilename: string) {
  let overridesSource = null
  if (overrideFilename) {
    try {
      overridesSource = await fs.promises.readFile(overrideFilename, "utf8")
    } catch {
      return
    }
  }
  if (overridesSource) {
    return babelParser.parse(overridesSource, { sourceType: "module", plugins: ["typescript"] })
  }
}

export async function convert({
  filename,
  outFilename,
  overrideFilename,
  overridesVisitors,
}: {
  filename: string
  outFilename: string
  overrideFilename?: string
  overridesVisitors?: OverridesVisitors
}): Promise<[string, boolean]> {
  let success = false
  let outData: string
  try {
    const pluginOptions: PluginOptions = {
      pathname: overrideFilename,
      overridesVisitors,
    }
    const result = await transformFileAsync(filename, {
      plugins: [pluginSyntaxFlow, [pluginFlow2DTS, pluginOptions]],
      sourceType: "module",
      parserOpts: {
        allowUndeclaredExports: true,
      },
    })
    if (result && result.code) {
      success = true
      outData = result.code
    } else {
      outData = "[FLOW2DTS - Error] Unknown error"
    }
  } catch (e: unknown) {
    console.log(e)
    outData = `[FLOW2DTS - Error] ${stripAnsi((e as Error).message)}`

    // FIXME: temporary solution to print generated code after the error
    let phrase = ""
    try {
      phrase = "fs.readFileSync"
      const flowCode = fs.readFileSync(filename, { encoding: "utf8" })

      phrase = "babelParser.parse"
      const flowAst = babelParser.parse(flowCode, {
        plugins: ["flow"],
        sourceType: "module",
        allowUndeclaredExports: true,
      })

      phrase = "babelTraverse()"
      babelTraverse<State>(flowAst, pluginFlow2DTS(undefined, {}, "").visitor, undefined, <State>{})

      phrase = "babelGenerator()"
      const generatorResult = babelGenerator(flowAst)
      outData = `${outData}\r\n\r\n${"=".repeat(64)}\r\n\r\n${generatorResult.code}`
    } catch (e: unknown) {
      outData = `${outData}\r\n\r\n${"=".repeat(64)}\r\n\r\n[${phrase}] ${(e as Error).message}`
    }
  }
  await fs.promises.mkdir(path.dirname(outFilename), { recursive: true })
  await fs.promises.writeFile(outFilename, fixPathInOutput(outData), "utf8")
  return [outFilename, success]
}
