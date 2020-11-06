import yargs from "yargs"
import glob from "fast-glob"
import path from "path"
import chalk from "chalk"

import { convert } from "./convert"

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
    })
    .help().argv

  const conversions: Array<Promise<void>> = []
  for await (const filename of glob.stream(argv._, { absolute: true })) {
    console.log(`⚒️ ${chalk.dim(path.relative(".", filename as string))}`)
    conversions.push(
      convert({ ...argv, filename: filename as string }).then(([success, outFilename]) => {
        const relativeOutFilename = path.relative(".", outFilename)
        console.log(success ? chalk.green(`✓ ${relativeOutFilename}`) : chalk.red(`‼️ ${relativeOutFilename}`))
      })
    )
  }
  await Promise.all(conversions)
}

main()
