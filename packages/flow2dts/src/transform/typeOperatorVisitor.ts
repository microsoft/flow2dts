import { Visitor, types as t } from "@babel/core"
import { State } from "./state"
import { wrappedTypeOf } from "./utilities"

export const typeOperatorVisitor: Visitor<State> = {
  TypeofTypeAnnotation: {
    exit(path, state) {
      const typeQueryOperator = path.node.argument as any
      t.assertTSTypeReference(typeQueryOperator)
      t.assertIdentifier(typeQueryOperator.typeName)
      const referencePath = path.scope.getBinding(typeQueryOperator.typeName.name)
      if (!referencePath) {
        throw new Error("invariant: expected referred to type to exist")
      }
      path.replaceWith(wrappedTypeOf(typeQueryOperator.typeName, state))
    },
  },
}
