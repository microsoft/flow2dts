import { Visitor, types as t } from "@babel/core"
import { State } from "./state"

/**
 * @babel/generator's TS support does not add extra parentheses around (arrow) function types when necessary.
 */
function ensureParenthesizedFunctionType(type: t.TSType) {
  return t.isTSFunctionType(type) ? t.tsParenthesizedType(type) : type
}

export const fixupVisitor: Visitor<State> = {
  TSArrayType: {
    exit(path) {
      path.node.elementType = ensureParenthesizedFunctionType(path.node.elementType)
    },
  },
  TSUnionType: {
    exit(path) {
      path.node.types = path.node.types.map(ensureParenthesizedFunctionType)
    },
  },
  TSIntersectionType: {
    exit(path) {
      path.node.types = path.node.types.map(ensureParenthesizedFunctionType)
    },
  },
}
