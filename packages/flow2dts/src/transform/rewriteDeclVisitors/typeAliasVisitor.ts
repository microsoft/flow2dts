// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { assertTSType } from "../utilities"

export const typeAliasVisitor: Visitor<State> = {
  TypeAlias: {
    exit(path) {
      const { id, typeParameters, right } = path.node
      if (typeParameters) t.assertTSTypeParameterDeclaration(typeParameters)
      assertTSType(right)
      const newAst = t.tsTypeAliasDeclaration(id, typeParameters, right)
      newAst.declare = true
      path.replaceWith(newAst)
    },
  },
  OpaqueType: {
    exit(path) {
      path.addComment("leading", "[FLOW2DTS - Warning] This type alias was opaque in the original Flow source.")
      const { id, typeParameters, impltype } = path.node
      assertTSType(impltype)
      const newAst = t.tsTypeAliasDeclaration(id, undefined, impltype)
      newAst.declare = true
      path.replaceWith(newAst)
    },
  },
}
