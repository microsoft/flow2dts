import { transformFileAsync } from "@babel/core"
// @ts-ignore
import pluginSyntaxFlow from "@babel/plugin-syntax-flow"
import path from "path"
import { transform as pluginFlow2DTS } from "./transform"
import fs from "fs"
import stripAnsi from "strip-ansi"

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

export async function convert({ filename, outFilename }: { filename: string; outFilename: string }) {
  let success = false
  let outData: string
  try {
    const result = await transformFileAsync(filename, {
      plugins: [pluginSyntaxFlow, pluginFlow2DTS],
    })
    if (result && result.code) {
      success = true
      outData = result.code
    } else {
      outData = "[FLOW2DTS - Error] Unknown error"
    }
  } catch (e: unknown) {
    outData = `[FLOW2DTS - Error] ${stripAnsi((e as Error).message)}`
  }
  await fs.promises.mkdir(path.dirname(outFilename), { recursive: true })
  await fs.promises.writeFile(outFilename, fixPathInOutput(outData), "utf8")
  return success
}
