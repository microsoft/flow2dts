// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HintPos, HintIdentifier, HintResolved, HintDecl, HintFile, HintImport } from "./hintfile"
import { Visitor, types as t } from "@babel/core"
import * as babelParser from "@babel/parser"
import babelTraverse from "@babel/traverse"
// @ts-ignore
import path from "path"
import fs from "fs"
import { exec, spawn } from "child_process"
import chalk from "chalk"

function id2hint(id: t.Identifier): HintIdentifier {
  return {
    row: <number>id.loc?.start.line,
    column: <number>id.loc?.start.column + 1,
    local: id.name,
  }
}

function id2decl(id: t.Identifier, t: HintDecl["type"]): HintDecl {
  return {
    row: <number>id.loc?.start.line,
    column: <number>id.loc?.start.column + 1,
    local: id.name,
    type: t,
  }
}

function flowImportAndDeclVisitor(forLibraryFile: boolean): Visitor<HintFile> {
  return {
    TypeofTypeAnnotation: {
      exit(path, state) {
        if (!forLibraryFile) {
          const typeQueryOperator = path.node.argument
          if (typeQueryOperator.type === "GenericTypeAnnotation") {
            const local = typeQueryOperator.id.type === "Identifier" ? typeQueryOperator.id : typeQueryOperator.id.id
            const source = id2hint(local)
            state.typeofs.push({ source })
          }
        }
      },
    },
    ImportDeclaration: {
      exit(path, state) {
        if (!forLibraryFile) {
          for (const specifier of path.node.specifiers) {
            let source: HintIdentifier | undefined
            switch (specifier.type) {
              case "ImportDefaultSpecifier": {
                source = id2hint(specifier.local)
                break
              }
              case "ImportNamespaceSpecifier": {
                source = id2hint(specifier.local)
                break
              }
              case "ImportSpecifier": {
                if (specifier.imported.type === "Identifier") {
                  source = id2hint(specifier.imported)
                }
                break
              }
            }

            if (source) {
              state.imports[specifier.local.name] = { source }
              if (path.node.importKind === "type" || path.node.importKind === "typeof") {
                state.imports[specifier.local.name].isImportedType = true
              }
            }
          }
        }
      },
    },
    VariableDeclaration: {
      exit(path, state) {
        for (const decl of path.node.declarations) {
          if (decl.id.type === "Identifier") {
            state.decls.push(id2decl(decl.id, "value"))
          }
        }
      },
    },
    DeclareVariable: {
      exit(path, state) {
        state.decls.push(id2decl(path.node.id, "value"))
      },
    },
    ClassDeclaration: {
      exit(path, state) {
        state.decls.push(id2decl(path.node.id, "class"))
      },
    },
    DeclareClass: {
      exit(path, state) {
        state.decls.push(id2decl(path.node.id, "class"))
      },
    },
    InterfaceDeclaration: {
      exit(path, state) {
        state.decls.push(id2decl(path.node.id, "type"))
      },
    },
    DeclareInterface: {
      exit(path, state) {
        state.decls.push(id2decl(path.node.id, "type"))
      },
    },
    ObjectTypeProperty: {
      exit(path, state) {
        if (path.node.key.type === "Identifier") {
          state.decls.push(id2decl(path.node.key, "value"))
        }
      },
    },
    ClassProperty: {
      exit(path, state) {
        if (path.node.key.type === "Identifier") {
          state.decls.push(id2decl(path.node.key, "value"))
        }
      },
    },
    DeclareFunction: {
      exit(path, state) {
        state.decls.push(id2decl(path.node.id, "value"))
      },
    },
    FunctionDeclaration: {
      exit(path, state) {
        if (path.node.id) {
          state.decls.push(id2decl(path.node.id, "value"))
        }
      },
    },
    ClassMethod: {
      exit(path, state) {
        if (path.node.key.type === "Identifier") {
          state.decls.push(id2decl(path.node.key, "value"))
        }
      },
    },
    TypeAlias: {
      exit(path, state) {
        state.decls.push(id2decl(path.node.id, "type"))
      },
    },
    OpaqueType: {
      exit(path, state) {
        state.decls.push(id2decl(path.node.id, "type"))
      },
    },
  }
}

const FLOW_BIN = require.resolve("flow-bin/cli.js")

const regexStdout = /^(.+\.js(\.flow)?):(\d+):(\d+),(\d+):(\d+)/

export interface HintFileEntries {
  libraries: string[]
  files: { [key: string]: HintFile }
}

async function resolveImport({
  hintImport,
  inputRootDir,
  inputFilename,
  modifiedRootDir,
  modifiedFilename,
  normalizedModifiedRootDir,
  collectedHintFiles,
}: {
  hintImport: HintImport
  inputRootDir: string
  inputFilename: string
  modifiedRootDir: string
  modifiedFilename: string
  normalizedModifiedRootDir: string
  collectedHintFiles: HintFileEntries
}): Promise<void> {
  hintImport.error = ""

  const relativePath = "." + inputFilename.substr(inputRootDir.length)
  const args = [FLOW_BIN, "get-def", relativePath, `${hintImport.source?.row}`, `${hintImport.source?.column}`]
  await new Promise<void>((resolve, reject) => {
    let resolved = false
    function callResolve() {
      if (!resolved) {
        resolved = true
        resolve()
      }
    }

    console.log(chalk.yellow("node " + args.join(" ")))
    const spawnResult = spawn("node", args, { cwd: modifiedRootDir })

    spawnResult.stdout.on("data", (data) => {
      if (!resolved) {
        console.log(chalk.blueBright(`${data}`))
        const match = `${data}`.match(regexStdout)
        if (match) {
          const begin: HintPos = { row: +match[3], column: +match[4] }
          const end: HintPos = { row: +match[5], column: +match[6] }
          const file = match[1].replace(/\\/g, "/")
          const fromLibrary = file.substr(0, normalizedModifiedRootDir.length) !== normalizedModifiedRootDir
          if (fromLibrary) {
            const dirname = path.dirname(file)
            const basename = "/" + path.basename(file)
            let libraryFolder = collectedHintFiles.libraries.indexOf(dirname)
            if (libraryFolder === -1) {
              libraryFolder = collectedHintFiles.libraries.length
              collectedHintFiles.libraries.push(dirname)
            }
            hintImport.resolved = {
              begin,
              end,
              libraryFolder,
              file: basename,
            }
          } else {
            hintImport.resolved = {
              begin,
              end,
              libraryFolder: -1,
              file: fromLibrary ? file : file.substr(normalizedModifiedRootDir.length),
            }
          }
          hintImport.error = undefined
        } else {
          hintImport.error += `[unrecognizable stdout]${data}`
        }
      }
    })
    spawnResult.stderr.on("data", (data) => {
      if (!resolved) {
        const error = `${data}`
        console.log(error)
        if (!error.startsWith("Please wait.")) {
          hintImport.error += error.replace(/\\/g, "/").replace(normalizedModifiedRootDir, "")
        }
      }
    })

    spawnResult.on("error", (error) => {
      if (!resolved) {
        console.log(chalk.red(error.message))
        callResolve()
      }
    })
    spawnResult.on("disconnect", () => {
      callResolve()
    })
    spawnResult.on("close", () => {
      callResolve()
    })
    spawnResult.on("exit", () => {
      callResolve()
    })
  })
}

export function resolvedToItself(hintImport: HintImport): boolean {
  return (
    hintImport.resolved !== undefined &&
    hintImport.source.column === hintImport.resolved.begin.column &&
    hintImport.source.row === hintImport.resolved.begin.row
  )
}

// "modified" files are flow scripts with "typeof" being replaced by six space characters
export async function singleFlow2Hint({
  inputRootDir,
  inputFilename,
  modifiedRootDir,
  modifiedFilename,
  outFilename,
  collectedHintFiles,
  forLibraryFile,
}: {
  inputRootDir: string
  inputFilename: string
  modifiedRootDir: string
  modifiedFilename: string
  outFilename: string
  collectedHintFiles: HintFileEntries
  forLibraryFile: boolean
}): Promise<string> {
  const normalizedInputRootDir = inputRootDir.replace(/\\/g, "/")
  const normalizedModifiedRootDir = modifiedRootDir.replace(/\\/g, "/")

  const flowCode = fs.readFileSync(inputFilename, { encoding: "utf8" })
  const flowAst = babelParser.parse(flowCode, {
    plugins: ["flow"],
    sourceType: "module",
    allowUndeclaredExports: true,
  })

  const hint: HintFile = { imports: {}, typeofs: [], decls: [] }
  if (forLibraryFile) {
    collectedHintFiles.files[inputFilename] = hint
  } else {
    collectedHintFiles.files[inputFilename.substr(inputRootDir.length).replace(/\\/g, "/")] = hint
  }
  babelTraverse<HintFile>(flowAst, flowImportAndDeclVisitor(forLibraryFile), undefined, hint)

  for (const key in hint.imports) {
    const hintImport = hint.imports[key]
    await resolveImport({
      hintImport,
      inputFilename,
      inputRootDir,
      modifiedFilename,
      modifiedRootDir,
      normalizedModifiedRootDir,
      collectedHintFiles,
    })
    if (resolvedToItself(hintImport)) {
      // if an import symbol is resolved to itself
      // it means removing "typeof" breaks here
      // try "flow get-def" on original files
      await resolveImport({
        hintImport,
        inputFilename,
        inputRootDir,
        modifiedFilename: inputFilename,
        modifiedRootDir: inputRootDir,
        normalizedModifiedRootDir: normalizedInputRootDir,
        collectedHintFiles,
      })
      // it is possible that the import symbols is still resolved to itself
      // all these will be resolved to "unresolved[guess-type]" and "unresolved[guess-value]"
    }
  }
  for (const hintTypeof of hint.typeofs) {
    await resolveImport({
      hintImport: hintTypeof,
      inputFilename,
      inputRootDir,
      modifiedFilename,
      modifiedRootDir,
      normalizedModifiedRootDir,
      collectedHintFiles,
    })
  }

  const outData = JSON.stringify(hint, undefined, 4)

  await fs.promises.mkdir(path.dirname(outFilename), { recursive: true })
  await fs.promises.writeFile(outFilename, outData, "utf8")
  return outFilename
}
