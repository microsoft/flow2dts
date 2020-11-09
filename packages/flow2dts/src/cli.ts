import yargs from "yargs"
import glob from "fast-glob"
import path from "path"
import chalk from "chalk"

import { convert } from "./convert"

const FLOW_EXTNAME = ".js.flow"

async function main() {
  const argv = yargs
    .scriptName("flow2dts")
    .usage("$0 --root path/to/flow/inputs --out path/to/ts/outputs [FILES]")
    .coerce(["rootDir", "outDir"], path.resolve)
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
    })
    .help().argv

  console.log(argv)
  const platformExtname = `.${argv.platform}${FLOW_EXTNAME}`
  let successCount = 0
  const conversions: Array<Promise<void>> = []
  for await (const _filename of glob.stream(argv._, { absolute: true })) {
    const filename = _filename as string
    const extname = filename.substring(filename.indexOf("."))
    const matchedExtname =
      extname === FLOW_EXTNAME ? FLOW_EXTNAME : extname === platformExtname ? platformExtname : null
    if (matchedExtname) {
      const outFilename = path.join(argv.outDir, path.relative(argv.rootDir, filename)).replace(matchedExtname, ".d.ts")
      console.log(`⚒️ ${chalk.dim(path.relative(".", filename))}`)
      conversions.push(
        convert({ ...argv, filename, outFilename }).then((success) => {
          if (success) {
            successCount++
          }
          const relativeOutFilename = path.relative(".", outFilename)
          console.log(success ? chalk.green(`✓ ${relativeOutFilename}`) : chalk.red(`‼️ ${relativeOutFilename}`))
        })
      )
    }
  }
  await Promise.all(conversions)
  console.log(`\nSuccessfully converted ${successCount} of ${conversions.length}\n`)
}

main()
