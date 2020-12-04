import { Visitor, types as t } from "@babel/core"
import * as babelParser from "@babel/parser"
import babelTraverse from "@babel/traverse"
// @ts-ignore
import path from "path"
import fs from "fs"

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

const pluginFlow2Hint: Visitor<HintFile> = {
  ImportDeclaration: {
    exit(path, state) {
      for (const specifier of path.node.specifiers) {
        let hintImport: HintImport
        switch (specifier.type) {
          case "ImportDefaultSpecifier": {
            hintImport = { source: id2hint(specifier.local) }
            state.imports[specifier.local.name] = hintImport
            break
          }
          case "ImportNamespaceSpecifier": {
            hintImport = { source: id2hint(specifier.local) }
            state.imports[specifier.local.name] = hintImport
            break
          }
          case "ImportSpecifier": {
            if (specifier.imported.type === "Identifier") {
              hintImport = { source: id2hint(specifier.imported) }
              state.imports[specifier.local.name] = hintImport
            }
            break
          }
        }
        // assign hintImport.resolved
      }
    },
  },
}

export async function convert({ filename, outFilename }: { filename: string; outFilename: string }): Promise<string> {
  const flowCode = fs.readFileSync(filename, { encoding: "utf8" })
  const flowAst = babelParser.parse(flowCode, {
    plugins: ["flow"],
    sourceType: "module",
    allowUndeclaredExports: true,
  })

  const hint: HintFile = { imports: {}, decls: [] }
  babelTraverse<HintFile>(flowAst, pluginFlow2Hint, undefined, hint)
  const outData = JSON.stringify(hint, undefined, 4)

  await fs.promises.mkdir(path.dirname(outFilename), { recursive: true })
  await fs.promises.writeFile(outFilename, outData, "utf8")
  return outFilename
}
