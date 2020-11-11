import yargs from "yargs"
import glob from "fast-glob"
import path from "path"
import chalk from "chalk"

import { convert } from "./convert"

const FLOW_EXTNAME = ".js.flow"

async function run({
  rootDir,
  outDir,
  platform,
  patterns,
  cwd,
}: {
  rootDir: string
  outDir: string
  platform: string
  patterns: string[]
  cwd?: string
}): Promise<[number, number]> {
  const platformExtname = `.${platform}${FLOW_EXTNAME}`
  let successCount = 0

  const conversions: Array<Promise<void>> = []
  for await (const _filename of glob.stream(patterns, { absolute: true, cwd })) {
    const filename = _filename as string
    const extname = filename.substring(filename.indexOf("."))
    const matchedExtname =
      extname === FLOW_EXTNAME ? FLOW_EXTNAME : extname === platformExtname ? platformExtname : null
    if (matchedExtname) {
      const outFilename = path.join(outDir, path.relative(rootDir, filename)).replace(matchedExtname, ".d.ts")
      console.log(`⚒️ ${chalk.dim(path.relative(cwd || ".", filename))}`)
      conversions.push(
        convert({ filename, outFilename }).then((success) => {
          if (success) {
            successCount++
          }
          const relativeOutFilename = path.relative(cwd || ".", outFilename)
          console.log(success ? chalk.green(`✓ ${relativeOutFilename}`) : chalk.red(`‼️ ${relativeOutFilename}`))
        })
      )
    }
  }
  await Promise.all(conversions)

  return [conversions.length, successCount]
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
    })
    .help().argv

  const cwd = argv.cwd
  const outDir = path.resolve(cwd || "", argv.outDir)
  const rootDir = path.resolve(cwd || "", argv.rootDir)
  const platform = argv.platform
  const patterns = argv._

  const [totalCount, successCount] = await run({ cwd, outDir, rootDir, platform, patterns })

  console.log(`\nSuccessfully converted ${successCount} of ${totalCount}\n`)

  process.exit(totalCount - successCount)
}

main()
