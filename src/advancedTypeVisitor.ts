import { PluginPass, Visitor, types as t } from "@babel/core"
import { assertTSType } from "./utilities"

export const advancedTypeVisitor: Visitor<PluginPass> = {
  TupleTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsTupleType(<t.TSType[]>(<unknown>path.node.types)))
    },
  },
  UnionTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsUnionType(<t.TSType[]>(<unknown>path.node.types)))
    },
  },
  IntersectionTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsIntersectionType(<t.TSType[]>(<unknown>path.node.types)))
    },
  },
  GenericTypeAnnotation: {
    exit(path) {
      if (path.node.id.type === "Identifier") {
        const name = path.node.id.name
        const args = path.node.typeParameters
        if (name === "undefined") {
          path.replaceWith(t.tsUndefinedKeyword())
        } else if (name === "Array" && args) {
          path.replaceWith(t.tsArrayType(<t.TSType>(<unknown>args.params[0])))
        } else if (name === "$ReadOnlyArray" && args) {
          path.replaceWith(
            t.tsTypeReference(
              t.identifier("ReadonlyArray"),
              t.tsTypeParameterInstantiation([<t.TSType>(<unknown>args.params[0])])
            )
          )
        } else {
          path.replaceWith(t.tsTypeReference(t.identifier(name)))
        }
      } else {
        // QualifiedTypeIdentifier -> QualifiedName
        throw "QualifiedTypeIdentifier not supported yet"
      }
    },
  },
}
