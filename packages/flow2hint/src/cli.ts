// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import yargs from "yargs"
import glob from "fast-glob"
import path from "path"
import fs from "fs"
import chalk from "chalk"

import { singleFlow2Hint } from "./singleFlow2Hint"

const FLOW_EXTNAME = ".js.flow"
const HINT_EXTNAME = ".hint.json"

async function run({
  rootDir,
  outDir,
  patterns,
  cwd,
}: {
  rootDir: string
  outDir: string
  patterns: string[]
  cwd?: string
}): Promise<[number, number]> {
  let totalCount = 0
  let successCount = 0
  for await (const _filename of glob.stream(patterns, { absolute: true, cwd })) {
    const filename = _filename as string
    const outFilename = getOutFilename(outDir, rootDir, filename, FLOW_EXTNAME)
    totalCount++

    if (fs.existsSync(outFilename)) {
      console.log(chalk.cyanBright(`✓ ${relativePath(cwd, outFilename)}`))
      successCount++
    } else {
      console.log(`⚒️ ${chalk.dim(relativePath(cwd, filename))}`)
      await singleFlow2Hint({ rootDir, filename, outFilename }).then((outFilename) => {
        console.log(chalk.green(`✓ ${relativePath(cwd, outFilename)}`))
        successCount++
      })
    }
  }
  return [totalCount, successCount]
}

function relativePath(cwd: string | undefined, filename: string) {
  return path.relative(cwd || ".", filename)
}

function getOutFilename(outDir: string, rootDir: string, filename: string, matchedExtname: string) {
  return path.join(outDir, path.relative(rootDir, filename)).replace(matchedExtname, HINT_EXTNAME)
}

async function main() {
  const argv = yargs
    .scriptName("flow2dts")
    .usage("$0 --root path/to/flow/inputs --out path/to/ts/outputs [FILES]")
    .options({
      rootDir: {
        nargs: 1,
        demandOption: true,
        describe: "The root directory of the Flow sources",
        type: "string",
      },
      outDir: {
        nargs: 1,
        demandOption: true,
        describe: "Where the hint files should be written",
        type: "string",
      },
      cwd: {
        nargs: 1,
        demandOption: false,
        describe: "The working directory from which to expand relative paths",
        type: "string",
      },
    })
    .help().argv

  const cwd = argv.cwd
  const outDir = path.resolve(cwd || "", argv.outDir)
  const rootDir = path.resolve(cwd || "", argv.rootDir)
  const patterns = argv._

  const [totalCount, successCount] = await run({ cwd, outDir, rootDir, patterns })
  console.log(`\nSuccessfully converted ${successCount} of ${totalCount}\n`)
  process.exit(totalCount - successCount)
}

main()
