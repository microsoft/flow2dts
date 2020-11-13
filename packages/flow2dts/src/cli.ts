import yargs from "yargs"
import glob from "fast-glob"
import path from "path"
import chalk from "chalk"

import { convert } from "./convert"

const FLOW_EXTNAME = ".js.flow"
const TS_EXTNAME = ".d.ts"

async function run({
  rootDir,
  outDir,
  overridesDir,
  platform,
  patterns,
  cwd,
}: {
  rootDir: string
  outDir: string
  overridesDir?: string
  platform: string
  patterns: string[]
  cwd?: string
}): Promise<[number, number]> {
  let successCount = 0
  const conversions: Array<Promise<void>> = []
  for await (const _filename of glob.stream(patterns, { absolute: true, cwd })) {
    const filename = _filename as string
    const matchedExtname = getExtname(filename, platform)
    if (matchedExtname) {
      const outFilename = getOutFilename(outDir, rootDir, filename, matchedExtname)
      const overrideFilename = overridesDir && getOverrideFilename(overridesDir, rootDir, filename)
      logStart(cwd, filename)
      conversions.push(
        convert({ filename, outFilename, overrideFilename }).then(([outFilename, success]) => {
          if (success) {
            successCount++
          }
          logEnd(cwd, outFilename, success)
        })
      )
    }
  }
  await Promise.all(conversions)
  return [conversions.length, successCount]
}

function logEnd(cwd: string | undefined, outFilename: string, success: boolean) {
  const relativeOutFilename = relativePath(cwd, outFilename)
  console.log(success ? chalk.green(`✓ ${relativePath(cwd, outFilename)}`) : chalk.red(`‼️ ${relativeOutFilename}`))
}

function logStart(cwd: string | undefined, filename: string) {
  console.log(`⚒️ ${chalk.dim(relativePath(cwd, filename))}`)
}

function relativePath(cwd: string | undefined, filename: string) {
  return path.relative(cwd || ".", filename)
}

function getExtname(filename: string, platform: string) {
  const platformExtname = `.${platform}${FLOW_EXTNAME}`
  const extname = filename.substring(filename.indexOf("."))
  return extname === FLOW_EXTNAME ? FLOW_EXTNAME : extname === platformExtname ? platformExtname : null
}

function filenameInOutDir(outDir: string, rootDir: string, filename: string) {
  return path.join(outDir, path.relative(rootDir, filename))
}

function getOutFilename(outDir: string, rootDir: string, filename: string, matchedExtname: string) {
  return filenameInOutDir(outDir, rootDir, filename).replace(matchedExtname, TS_EXTNAME)
}

function getOverrideFilename(overrideDir: string, rootDir: string, filename: string) {
  return filenameInOutDir(overrideDir, rootDir, filename).replace(FLOW_EXTNAME, TS_EXTNAME)
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
        describe: "Where the TS sources should be written",
        type: "string",
      },
      platform: {
        nargs: 1,
        demandOption: true,
        describe: "Determines which platform specific files to include",
        type: "string",
        choices: ["ios", "android"],
      },
      cwd: {
        nargs: 1,
        demandOption: false,
        describe: "The working directory from which to expand relative paths",
        type: "string",
      },
      overridesDir: {
        nargs: 1,
        demandOption: false,
        describe:
          "A dir structure that resembles the rootDir tree with files that should be used to provide overrides for declarations",
        type: "string",
      },
    })
    .help().argv

  const cwd = argv.cwd
  const outDir = path.resolve(cwd || "", argv.outDir)
  const rootDir = path.resolve(cwd || "", argv.rootDir)
  const overridesDir = argv.overridesDir && path.resolve(cwd || "", argv.overridesDir)
  const platform = argv.platform
  const patterns = argv._

  const [totalCount, successCount] = await run({ cwd, outDir, rootDir, overridesDir, platform, patterns })

  console.log(`\nSuccessfully converted ${successCount} of ${totalCount}\n`)

  process.exit(totalCount - successCount)
}

main()
