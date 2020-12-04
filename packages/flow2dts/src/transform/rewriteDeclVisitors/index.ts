// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { declarationVisitor } from "./declarationVisitor"
import { functionVisitor } from "./functionVisitor"
import { typeAliasVisitor } from "./typeAliasVisitor"
import { importVisitor } from "./importVisitor"
import { exportVisitor } from "./exportVisitor"
import { combineVisitorsSafe } from "../state"

export const rewriteDeclVisitor = combineVisitorsSafe(
  declarationVisitor,
  functionVisitor,
  typeAliasVisitor,
  importVisitor,
  exportVisitor
)
