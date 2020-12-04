// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t } from "@babel/core"
import { State } from "./state"

export interface Options {
  moduleRelative?: string
  moduleName?: string
}

function fixOptionalParameter(params: Array<t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty>): void {
  if (!params) return
  let incorrectOptionals: t.Identifier[] = []
  let currentOptionals: t.Identifier[] = []
  for (const param of params) {
    switch (param.type) {
      case "Identifier": {
        if (param.optional) {
          currentOptionals.push(param)
        } else {
          incorrectOptionals = incorrectOptionals.concat(currentOptionals)
          currentOptionals = []
        }
        break
      }
      case "RestElement": {
        break
      }
      default: {
        incorrectOptionals = incorrectOptionals.concat(currentOptionals)
        currentOptionals = []
      }
    }
  }

  for (const id of incorrectOptionals) {
    if (id.typeAnnotation?.type === "TSTypeAnnotation" && id.typeAnnotation.typeAnnotation.type === "TSUnionType") {
      for (const item of id.typeAnnotation.typeAnnotation.types) {
        if (item.type === "TSNullKeyword" || item.type === "TSUndefinedKeyword") {
          id.optional = false
          break
        }
      }
    }
  }
}

export function createFixupVisitor(options?: Options): Visitor<State> {
  return {
    TSFunctionType: {
      exit(path) {
        if (
          path.parentPath.isTSArrayType() ||
          path.parentPath.isTSUnionType() ||
          path.parentPath.isTSIntersectionType()
        ) {
          path.replaceWith(t.tsParenthesizedType(path.node))
        }
        fixOptionalParameter(path.node.parameters)
      },
    },
    TSDeclareFunction: {
      exit(path) {
        fixOptionalParameter(path.node.params)
      },
    },
    TSDeclareMethod: {
      exit(path) {
        fixOptionalParameter(path.node.params)
      },
    },
    ImportDeclaration: {
      exit(path) {
        if (options && options.moduleName && options.moduleRelative) {
          if (path.node.source.value === options.moduleName) {
            path.node.source.value = options.moduleRelative
          } else if (path.node.source.value.startsWith(`${options.moduleName}/`)) {
            path.node.source.value = `${options.moduleRelative}${path.node.source.value.substr(
              options.moduleName.length
            )}`
          }
        }
      },
    },
  }
}
