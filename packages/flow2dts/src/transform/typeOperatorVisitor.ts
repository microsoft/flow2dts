import { Visitor, types as t } from "@babel/core"
import { State } from "./index"

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
      state.polyfillFlowTypes.add("$TypeOf")
      path.replaceWith(
        t.tsTypeReference(
          t.identifier("$TypeOf"),
          t.tsTypeParameterInstantiation([t.tsTypeQuery(typeQueryOperator.typeName)])
        )
      )
    },
  },
}
