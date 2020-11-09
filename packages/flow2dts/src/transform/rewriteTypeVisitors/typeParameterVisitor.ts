import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { assertTSType } from "../utilities"

export const typeParameterVisitor: Visitor<State> = {
  TypeParameterDeclaration: {
    exit(path) {
      path.replaceWith(
        t.tsTypeParameterDeclaration(
          path.node.params.map((flowParam) => {
            assertTSType(flowParam.bound?.typeAnnotation)
            assertTSType(flowParam.default)
            const newAst = t.tsTypeParameter(flowParam.bound?.typeAnnotation, flowParam.default, flowParam.name)

            if (flowParam.variance) {
              t.addComment(newAst, "leading", "[FLOW2DTS - Warning] Covariance and contravariance are ignored.")
            }
            return newAst
          })
        )
      )
    },
  },
}
