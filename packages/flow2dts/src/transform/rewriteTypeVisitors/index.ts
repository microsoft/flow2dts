import { primitiveTypeVisitor } from "./primitiveTypeVisitor"
import { advancedTypeVisitor } from "./advancedTypeVisitor"
import { objectTypeVisitor } from "./objectTypeVisitor"
import { typeOperatorVisitor } from "./typeOperatorVisitor"
import { typeParameterVisitor } from "./typeParameterVisitor"
import { combineVisitorsSafe } from "../state"

export const rewriteTypeVisitor = combineVisitorsSafe(
  primitiveTypeVisitor,
  advancedTypeVisitor,
  objectTypeVisitor,
  typeOperatorVisitor,
  typeParameterVisitor
)
