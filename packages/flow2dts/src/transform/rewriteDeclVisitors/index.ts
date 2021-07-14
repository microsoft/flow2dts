// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t } from "@babel/core"
import { declarationVisitor } from "./declarationVisitor"
import { functionVisitor } from "./functionVisitor"
import { typeAliasVisitor } from "./typeAliasVisitor"
import { importVisitor } from "./importVisitor"
import { exportVisitor } from "./exportVisitor"
import { combineVisitorsSafe, State } from "../state"

export const rewriteDeclVisitorPass1 = combineVisitorsSafe(
  declarationVisitor,
  functionVisitor,
  typeAliasVisitor,
  importVisitor,
  exportVisitor
)

export const rewriteDeclVisitorPass2: Visitor<State> = {
  TSTypeAliasDeclaration: {
    exit(path, state) {
      if (path.parent.type !== "ExportNamedDeclaration" && state.importToExport.has(path.node.id.name)) {
        path.replaceWith(t.exportNamedDeclaration(path.node))
      }
    }
  }
}
