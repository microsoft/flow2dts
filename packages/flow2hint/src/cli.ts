import yargs from "yargs"
import glob from "fast-glob"
import path from "path"
import chalk from "chalk"

import { convert } from "./convert"

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
  let successCount = 0
  const conversions: Array<Promise<void>> = []
  for await (const _filename of glob.stream(patterns, { absolute: true, cwd })) {
    const filename = _filename as string
    const outFilename = getOutFilename(outDir, rootDir, filename, FLOW_EXTNAME)
    conversions.push(
      convert({ filename, outFilename }).then((outFilename) => {
        const relativeOutFilename = relativePath(cwd, outFilename)
        console.log(chalk.green(`✓ ${relativePath(cwd, outFilename)}`))
      })
    )
  }
  await Promise.all(conversions)
  return [conversions.length, successCount]
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
