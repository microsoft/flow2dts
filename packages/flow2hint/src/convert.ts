// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t } from "@babel/core"
import * as babelParser from "@babel/parser"
import babelTraverse from "@babel/traverse"
// @ts-ignore
import path from "path"
import fs from "fs"
import { exec, spawn } from "child_process"
import chalk from "chalk"

interface HintPos {
  row: number
  column: number
}

interface HintIdentifier extends HintPos {
  local: string
}

interface HintResolved extends HintPos {
  file: string
}

interface HintImport {
  source: HintIdentifier
  resolved?: HintResolved
  stdout?: string
}

interface HintDecl extends HintIdentifier {
  type: "type" | "value" | "class"
}

interface HintFile {
  imports: { [key: string]: HintImport }
  decls: HintDecl[]
}

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

function pluginFlow2Hint(rootDir: string, filename: string): Visitor<HintFile> {
  return {
    ImportDeclaration: {
      exit(path, state) {
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

export async function convert({
  rootDir,
  filename,
  outFilename,
}: {
  rootDir: string
  filename: string
  outFilename: string
}): Promise<string> {
  const flowCode = fs.readFileSync(filename, { encoding: "utf8" })
  const flowAst = babelParser.parse(flowCode, {
    plugins: ["flow"],
    sourceType: "module",
    allowUndeclaredExports: true,
  })

  const hint: HintFile = { imports: {}, decls: [] }
  babelTraverse<HintFile>(flowAst, pluginFlow2Hint(rootDir, filename), undefined, hint)

  for (const key in hint.imports) {
    const hintImport = hint.imports[key]

    const relativePath = "." + filename.substr(rootDir.length)
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
      const spawnResult = spawn("node", args, { cwd: rootDir })

      spawnResult.stdout.on("data", (data) => {
        if (!resolved) {
          hintImport.stdout = `${data}`
          console.log(chalk.blueBright(`${data}`))
        }
      })
      spawnResult.stderr.on("data", (data) => {
        if (!resolved) {
          console.log(`${data}`)
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

  const outData = JSON.stringify(hint, undefined, 4)

  await fs.promises.mkdir(path.dirname(outFilename), { recursive: true })
  await fs.promises.writeFile(outFilename, outData, "utf8")
  return outFilename
}
