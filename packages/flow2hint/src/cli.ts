// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import yargs from "yargs"
import glob from "fast-glob"
import path from "path"
import fs from "fs"
import chalk from "chalk"

import { HintImport } from "./hintfile"
import { singleFlow2Hint, HintFileEntries } from "./singleFlow2Hint"
import { mergeHint } from "./mergeHint"

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
}): Promise<[number, number, HintFileEntries]> {
  let totalCount = 0
  let successCount = 0
  const collectedHintFiles: HintFileEntries = { libraries: [], files: {} }
  for await (const _filename of glob.stream(patterns, { absolute: true, cwd })) {
    const filename = _filename as string
    const outFilename = getOutFilename(outDir, rootDir, filename, FLOW_EXTNAME)
    totalCount++

    if (fs.existsSync(outFilename)) {
      console.log(chalk.cyanBright(`✓ ${relativePath(cwd, outFilename)}`))
      successCount++
    } else {
      console.log(`⚒️ ${chalk.dim(relativePath(cwd, filename))}`)
      await singleFlow2Hint({ rootDir, filename, outFilename, collectedHintFiles, forLibraryFile: false }).then(
        (outFilename) => {
          console.log(chalk.green(`✓ ${relativePath(cwd, outFilename)}`))
          successCount++
        }
      )
    }
  }
  return [totalCount, successCount, collectedHintFiles]
}

function relativePath(cwd: string | undefined, filename: string) {
  return path.relative(cwd || ".", filename)
}

function getOutFilename(outDir: string, rootDir: string, filename: string, matchedExtname: string) {
  return path.join(outDir, path.relative(rootDir, filename)).replace(matchedExtname, HINT_EXTNAME)
}

function collectLibraryFile(collectedHintFiles: HintFileEntries, hintImport: HintImport, libraryFiles: string[]) {
  if (hintImport.resolved && hintImport.resolved.libraryFolder !== -1) {
    const libraryFile = collectedHintFiles.libraries[hintImport.resolved.libraryFolder] + hintImport.resolved.file
    if (libraryFiles.indexOf(libraryFile) !== -1) {
      libraryFiles.push(libraryFile)
    }
  }
}

// specifically for Flow's extracted library file
async function processLibraryFiles(
  rootDir: string,
  outDir: string,
  cwd: string | undefined,
  collectedHintFiles: HintFileEntries
) {
  const libraryFiles: string[] = []
  for (const key in collectedHintFiles.files) {
    const hintFile = collectedHintFiles.files[key]
    for (const importKey in hintFile.imports) {
      collectLibraryFile(collectedHintFiles, hintFile.imports[importKey], libraryFiles)
    }
    for (const hintTypeof of hintFile.typeofs) {
      collectLibraryFile(collectedHintFiles, hintTypeof, libraryFiles)
    }
  }

  libraryFiles.sort()
  for (const filename of libraryFiles) {
    const outFilename = path.join(outDir, "__flow__", path.basename(filename, ".js") + ".hint.json")
    await singleFlow2Hint({ rootDir, filename, outFilename, collectedHintFiles, forLibraryFile: true }).then(
      (outFilename) => {
        console.log(chalk.green(`✓ ${relativePath(cwd, outFilename)}`))
      }
    )
  }
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

  const [totalCount, successCount, collectedHintFiles] = await run({ cwd, outDir, rootDir, patterns })
  await processLibraryFiles(rootDir, outDir, cwd, collectedHintFiles)
  console.log(`\nSuccessfully converted ${successCount} of ${totalCount}\n`)

  const mergedEntries = mergeHint(collectedHintFiles)
  await fs.promises.writeFile(path.join(outDir, "hint.json"), JSON.stringify(mergedEntries, undefined, 4), "utf8")
  process.exit(totalCount - successCount)
}

main()
