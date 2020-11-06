import { PluginPass, Visitor, types as t } from "@babel/core"

export const typeOperatorVisitor: Visitor<PluginPass> = {
  TypeofTypeAnnotation: {
    exit(path) {
      const typeQueryOperator = path.node.argument as any
      t.assertTSTypeReference(typeQueryOperator)
      t.assertIdentifier(typeQueryOperator.typeName)
      const referencePath = path.scope.getBinding(typeQueryOperator.typeName.name)
      if (!referencePath) {
        throw new Error("invariant: expected referred to type to exist")
      }
      if (referencePath.path.isDeclareClass() || referencePath.path.isClassDeclaration()) {
        path.replaceWith(typeQueryOperator)
      } else {
        path.replaceWith(t.tsTypeQuery(typeQueryOperator.typeName))
      }
    },
  },
}
