import { transformFileAsync } from "@babel/core"
// @ts-ignore
import pluginSyntaxFlow from "@babel/plugin-syntax-flow"
import path from "path"
import { transform as pluginFlow2DTS } from "./transform"
import fs from "fs"
import stripAnsi from "strip-ansi"

export async function convert({
  rootDir,
  outDir,
  filename,
}: {
  rootDir: string
  outDir: string
  filename: string
}): Promise<[boolean, string]> {
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
  const outFilename = path.join(outDir, path.relative(rootDir, filename)).replace(/\.js\.flow$/, ".d.ts")
  await fs.promises.mkdir(path.dirname(outFilename), { recursive: true })
  await fs.promises.writeFile(outFilename, outData, "utf8")
  return [success, outFilename]
}
