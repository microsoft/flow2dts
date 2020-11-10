import { Visitor, types as t } from "@babel/core"
import { State } from "./state"

export const fixupVisitor: Visitor<State> = {
  TSFunctionType: {
    exit(path) {
      if (
        path.parentPath.isTSArrayType() ||
        path.parentPath.isTSUnionType() ||
        path.parentPath.isTSIntersectionType()
      ) {
        path.replaceWith(t.tsParenthesizedType(path.node))
      }
    },
  },
}
