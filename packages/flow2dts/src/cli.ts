import yargs from "yargs"
import glob from "fast-glob"
import path from "path"
import chalk from "chalk"

import { convert } from "./convert"
import { OverridesVisitors } from "./transform/applyOverridesVisitors"

const FLOW_EXTNAME = ".js.flow"
const TS_EXTNAME = ".d.ts"

async function run({
  rootDir,
  outDir,
  overridesPath,
  platform,
  patterns,
  cwd,
}: {
  rootDir: string
  outDir: string
  overridesPath?: string
  platform: string
  patterns: string[]
  cwd?: string
}): Promise<[number, number]> {
  const overridesVisitors =
    overridesPath === undefined ? undefined : (require(overridesPath).default as OverridesVisitors)
  let successCount = 0
  const conversions: Array<Promise<void>> = []
  for await (const _filename of glob.stream(patterns, { absolute: true, cwd })) {
    const filename = _filename as string
    const matchedExtname = getExtname(filename, platform)
    if (matchedExtname) {
      const outFilename = getOutFilename(outDir, rootDir, filename, matchedExtname)
      const overrideFilename = overridesVisitors && getOverrideFilename(rootDir, filename)
      logStart(cwd, filename)
      conversions.push(
        convert({ rootDir, filename, outFilename, overridesVisitors, overrideFilename }).then(
          ([outFilename, success]) => {
            if (success) {
              successCount++
            }
            logEnd(cwd, outFilename, success)
          }
        )
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
  const basename = path.basename(filename)
  const extname = basename.substring(basename.indexOf("."))
  return extname === FLOW_EXTNAME ? FLOW_EXTNAME : extname === platformExtname ? platformExtname : null
}

function getOutFilename(outDir: string, rootDir: string, filename: string, matchedExtname: string) {
  return path.join(outDir, path.relative(rootDir, filename)).replace(matchedExtname, TS_EXTNAME)
}

function getOverrideFilename(rootDir: string, filename: string) {
  return path.relative(rootDir, filename).replace(FLOW_EXTNAME, TS_EXTNAME).replace(/\\/g, "/")
}

async function main() {
  const argv = yargs
    .scriptName("flow2dts")
    .usage(
      "$0 --root path/to/flow/inputs --out path/to/ts/outputs [FILES]",
      "FILES can be a list of include patterns or exclude by prepending the ! operator."
    )
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
      overrides: {
        nargs: 1,
        demandOption: false,
        describe:
          "A file that exports a OverridesVisitor object used to provide project specific overrides where conversion cannot accurately be made",
        type: "string",
      },
    })
    .help().argv

  const cwd = argv.cwd
  const outDir = path.resolve(cwd || "", argv.outDir)
  const rootDir = path.resolve(cwd || "", argv.rootDir)
  const overridesPath = argv.overrides && path.resolve(cwd || "", argv.overrides)
  const platform = argv.platform
  const patterns = argv._

  const [totalCount, successCount] = await run({ cwd, outDir, rootDir, overridesPath, platform, patterns })

  console.log(`\nSuccessfully converted ${successCount} of ${totalCount}\n`)

  process.exit(totalCount - successCount)
}

main()
