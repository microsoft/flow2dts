import { declarationVisitor } from "./declarationVisitor"
import { importVisitor } from "./importVisitor"
import { exportVisitor } from "./exportVisitor"
import { combineVisitorsSafe } from "../state"

export const rewriteDeclVisitor = combineVisitorsSafe(declarationVisitor, importVisitor, exportVisitor)
