import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { ReferenceRecord } from "./state"

export const typeReferenceRecognizerVisitor: Visitor<State> = {
  DeclareVariable: {
    enter(path, state) {
      const decl = path.node
      if (path.parentPath.node.type !== "Program") return
      if (!decl.id.typeAnnotation) return
      if (decl.id.typeAnnotation.type !== "TypeAnnotation") return
      if (decl.id.typeAnnotation.typeAnnotation.type !== "TypeofTypeAnnotation") return
      if (decl.id.typeAnnotation.typeAnnotation.argument.type !== "GenericTypeAnnotation") return

      if (state.typeReferences.records[decl.id.name]) {
        throw new Error(`Found duplicated variables in module: ${decl.id.name}`)
      }

      state.typeReferences.records[decl.id.name] = {
        variable: path.node,
        original: decl.id.typeAnnotation.typeAnnotation.argument.id,
        resolved: null,
      }
      decl.id.typeAnnotation = null
    },
  },
}
