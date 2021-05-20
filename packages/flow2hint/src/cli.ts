// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import yargs from "yargs"
import glob from "fast-glob"
import path from "path"
import fs from "fs"
import chalk from "chalk"

import { HintImport, HintFile, ResolvedHintEntries } from "./hintfile"
import { singleFlow2Hint, HintFileEntries } from "./singleFlow2Hint"
import { mergeHint } from "./mergeHint"

const FLOW_EXTNAME = ".js.flow"
const HINT_EXTNAME = ".hint.json"
const MERGED_FILE = "hint.json"

async function run({
  inputRootDir,
  modifiedRootDir,
  outDir,
  mergedFilename,
  patterns,
  cwd,
}: {
  inputRootDir: string
  modifiedRootDir: string
  outDir: string
  mergedFilename: string
  patterns: string[]
  cwd?: string
}): Promise<[number, number, HintFileEntries]> {
  let totalCount = 0
  let successCount = 0
  const collectedHintFiles: HintFileEntries = { libraries: [], files: {} }
  const mergedPath = path.join(outDir, MERGED_FILE)
  if (fs.existsSync(mergedFilename)) {
    collectedHintFiles.libraries = (<ResolvedHintEntries>require(mergedFilename)).libraries
  }

  const modifiedFullPaths: [string, string][] = []
  for await (const _filename of glob.stream(patterns, { absolute: true, cwd })) {
    const filename = _filename as string
    const modifiedFilename = getModifiedFilename(modifiedRootDir, inputRootDir, filename)
    modifiedFullPaths.push([filename, modifiedFilename])

    const inputCode = await fs.promises.readFile(filename, { encoding: "utf8" })
    // replace "typeof" to six space characters, but not touch
    // "import typeof"
    // "declare module.exports typeof"
    // "declare export default"
    const outputCode = inputCode.replace(
      /(?<!import\s|declare\smodule.exports:\s|declare\sexport\sdefault\s)(?<=\W)typeof\s/g,
      "       "
    )
    await fs.promises.mkdir(path.dirname(modifiedFilename), { recursive: true })
    await fs.promises.writeFile(modifiedFilename, outputCode, { encoding: "utf8" })

    console.log(chalk.gray(`✓ ${relativePath(cwd, modifiedFilename)}`))
  }

  for (const [inputFilename, modifiedFilename] of modifiedFullPaths) {
    const outFilename = getOutFilename(outDir, inputRootDir, inputFilename, FLOW_EXTNAME)
    totalCount++

    if (fs.existsSync(outFilename)) {
      collectedHintFiles.files[inputFilename.substr(modifiedRootDir.length).replace(/\\/g, "/")] = <HintFile>(
        require(outFilename)
      )
      console.log(chalk.cyanBright(`✓ ${relativePath(cwd, outFilename)}`))
      successCount++
    } else {
      console.log(`⚒️ ${chalk.dim(relativePath(cwd, outFilename))}`)
      await singleFlow2Hint({
        inputRootDir,
        inputFilename,
        modifiedRootDir,
        modifiedFilename,
        outFilename,
        collectedHintFiles,
        forLibraryFile: false,
      }).then((outFilename) => {
        console.log(chalk.green(`✓ ${relativePath(cwd, outFilename)}`))
        successCount++
      })
    }
  }
  return [totalCount, successCount, collectedHintFiles]
}

function relativePath(cwd: string | undefined, filename: string) {
  return path.relative(cwd || ".", filename)
}

function getModifiedFilename(modifiedDir: string, rootDir: string, filename: string) {
  return path.join(modifiedDir, path.relative(rootDir, filename))
}

function getOutFilename(outDir: string, rootDir: string, filename: string, matchedExtname: string) {
  return path.join(outDir, path.relative(rootDir, filename)).replace(matchedExtname, HINT_EXTNAME)
}

function collectLibraryFile(collectedHintFiles: HintFileEntries, hintImport: HintImport, libraryFiles: string[]) {
  if (hintImport.resolved && hintImport.resolved.libraryFolder !== -1) {
    const libraryFile = collectedHintFiles.libraries[hintImport.resolved.libraryFolder] + hintImport.resolved.file
    if (libraryFiles.indexOf(libraryFile) === -1) {
      libraryFiles.push(libraryFile)
    }
  }
}

// specifically for Flow's extracted library file
async function processLibraryFiles({
  inputRootDir,
  modifiedRootDir,
  outDir,
  cwd,
  collectedHintFiles,
}: {
  inputRootDir: string
  modifiedRootDir: string
  outDir: string
  cwd: string | undefined
  collectedHintFiles: HintFileEntries
}): Promise<[number, number]> {
  const libraryFiles: string[] = []
  let successCount = 0

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
    if (fs.existsSync(outFilename)) {
      collectedHintFiles.files[filename] = <HintFile>require(outFilename)
      console.log(chalk.cyanBright(`✓ ${relativePath(cwd, outFilename)}`))
      successCount++
    } else {
      await singleFlow2Hint({
        inputRootDir,
        inputFilename: filename,
        modifiedRootDir,
        modifiedFilename: filename,
        outFilename,
        collectedHintFiles,
        forLibraryFile: true,
      }).then((outFilename) => {
        console.log(chalk.green(`✓ ${relativePath(cwd, outFilename)}`))
        successCount++
      })
    }
  }

  return [libraryFiles.length, successCount]
}

async function main() {
  const argv = yargs
    .scriptName("flow2hint")
    .usage("$0 --root path/to/flow/inputs --out path/to/ts/outputs [FILES]")
    .options({
      workbenchDir: {
        nargs: 1,
        demandOption: true,
        describe: "The root directory per platform containing \"{platform}/hint\", \"{platform}/inputs\" and \"{platform}/outputs\"",
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
  const platform = argv.platform
  const workbenchDir = path.resolve(cwd || "", argv.workbenchDir)
  const outDir = path.join(workbenchDir, platform, "hint")
  const inputRootDir = path.join(workbenchDir, platform, "inputs")
  const modifiedRootDir = path.join(outDir, "__modified__")
  const patterns = [
    `${inputRootDir}/{index,Libraries/**/*}.js.flow`,
    `!${inputRootDir}/Libraries/**/{__flowtests__,__mocks__,__tests__}/**/*.js.flow`,
    `!${inputRootDir}/Libraries/{Inspector,JSInspector,NewAppScreen,ReactPrivate}/**/*.js.flow`,
    `!${inputRootDir}/Libraries/Animated/AnimatedWeb.js.flow`,
    `!${inputRootDir}/Libraries/{Promise,promiseRejectionIsError,promiseRejectionTrackingOptions}.js.flow`,
    `!${inputRootDir}/Libraries/vendor/core/ErrorUtils.js.flow`,
  ]

  const mergedFilename = path.join(outDir, MERGED_FILE)
  const [totalCount, successCount, collectedHintFiles] = await run({
    inputRootDir,
    modifiedRootDir,
    outDir,
    mergedFilename,
    patterns,
    cwd,
  })
  console.log(`\nSuccessfully converted local files ${successCount} of ${totalCount}\n`)
  const [totalLibrary, successLibrary] = await processLibraryFiles({
    inputRootDir,
    modifiedRootDir,
    outDir,
    cwd,
    collectedHintFiles,
  })
  console.log(`\nSuccessfully converted library files ${successLibrary} of ${totalLibrary}\n`)

  const mergedEntries = mergeHint(collectedHintFiles)
  await fs.promises.writeFile(mergedFilename, JSON.stringify(mergedEntries, undefined, 4), "utf8")
  process.exit(totalCount - successCount)
}

main()
