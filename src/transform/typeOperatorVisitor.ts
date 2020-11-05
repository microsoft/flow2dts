import { PluginPass, Visitor, types as t } from "@babel/core"

export const typeOperatorVisitor: Visitor<PluginPass> = {
  TypeofTypeAnnotation: {
    exit(path) {
      const typeQueryOperator = path.node.argument as any
      t.assertTSTypeReference(typeQueryOperator)
      path.replaceWith(t.tsTypeQuery(typeQueryOperator.typeName))
    },
  },
}
