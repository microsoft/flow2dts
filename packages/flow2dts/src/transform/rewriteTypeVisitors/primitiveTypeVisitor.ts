// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { assertTSType } from "../utilities"

export const primitiveTypeVisitor: Visitor<State> = {
  AnyTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsAnyKeyword())
    },
  },
  BooleanTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsBooleanKeyword())
    },
  },
  BooleanLiteralTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsLiteralType(t.booleanLiteral(path.node.value)))
    },
  },
  NumberTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsNumberKeyword())
    },
  },
  NumberLiteralTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsLiteralType(t.numericLiteral(path.node.value)))
    },
  },
  StringTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsStringKeyword())
    },
  },
  StringLiteralTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsLiteralType(t.stringLiteral(path.node.value)))
    },
  },
  VoidTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsVoidKeyword())
    },
  },
  NullLiteralTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsNullKeyword())
    },
  },
  MixedTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsUnknownKeyword())
    },
  },
  EmptyTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsNeverKeyword())
    },
  },
  ExistsTypeAnnotation: {
    exit(path) {
      path.replaceWith(t.tsAnyKeyword())
    },
  },
}
