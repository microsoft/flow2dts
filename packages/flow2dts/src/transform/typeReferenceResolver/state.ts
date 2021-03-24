// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NodePath, types as t } from "@babel/core"
import { State } from "../state"
import { isRequireDeclaration } from './typeReferenceRecognizerVisitor'

export interface ReferenceRecord {
  variable: t.DeclareVariable
  original: t.Identifier | t.QualifiedTypeIdentifier
  resolved: t.TSEntityName | null
}

export interface RecognizedTypeReferences {
  records: { [key: string]: ReferenceRecord }
  imports: { [key: string]: t.VariableDeclarator | t.ImportDeclaration }
  exports: { [key: string]: [t.ExportNamedDeclaration, t.ExportSpecifier] }
}

export function isVariableDiscardable(typeReferences: RecognizedTypeReferences, variable: t.DeclareVariable): boolean {
  const name = variable.id.name
  const varDecl = typeReferences.records[name]?.variable
  const exportDecl = typeReferences.exports[name]
  return varDecl === variable && exportDecl === undefined
}

function makeResolved(
  typeReferences: RecognizedTypeReferences,
  original: t.Identifier | t.QualifiedTypeIdentifier
): t.TSEntityName {
  if (original.type === "Identifier") {
    const record = typeReferences.records[original.name]
    if (record) {
      return ensureResolved(typeReferences, record)
    } else {
      return t.identifier(original.name)
    }
  } else {
    return t.tsQualifiedName(makeResolved(typeReferences, original.qualification), t.identifier(original.id.name))
  }
}

function ensureResolved(typeReferences: RecognizedTypeReferences, record: ReferenceRecord): t.TSEntityName {
  if (!record.resolved) {
    record.resolved = makeResolved(typeReferences, record.original)
  }
  return record.resolved
}

function convertMemberExpressionToQualifiedTypeIdentifier(
  member: t.Expression
): t.Identifier | t.QualifiedTypeIdentifier | undefined {
  if (member.type === "Identifier") {
    return member
  } else if (
    member.type === "MemberExpression" &&
    member.property.type === "Identifier" &&
    (member.object.type === "MemberExpression" || member.object.type === "Identifier")
  ) {
    const parent = convertMemberExpressionToQualifiedTypeIdentifier(member.object)
    if (!parent) return undefined
    return t.qualifiedTypeIdentifier(member.property, parent)
  } else {
    return undefined
  }
}

function convertTSEntityNameToMemberExpression(entity: t.TSEntityName): t.MemberExpression | t.Identifier {
  if (entity.type === "Identifier") {
    return entity
  } else {
    return t.memberExpression(convertTSEntityNameToMemberExpression(entity.left), entity.right)
  }
}

export function resolveQualifiedTypeIdentifier<T>(
  typeReferences: RecognizedTypeReferences,
  path: NodePath<T>,
  flowType: t.Identifier | t.QualifiedTypeIdentifier
): t.TSEntityName | undefined {
  /*
   Check if the first identifier references one of a recognized DeclareVariable.
   getBinding is necessary because name could be hidden by anything inside scopes.
   But once it hits the target,
   since all recognized DeclareVariable are right under the root module,
   there is no need to call getBinding anymore,
   it is not impossible to have name hiding.
   */

  let firstName = flowType
  while (firstName.type !== "Identifier") {
    firstName = firstName.qualification
  }

  const binding = path.scope.getBinding(firstName.name)
  if (!binding) return undefined

  const record = typeReferences.records[binding.identifier.name]
  if (!record) return undefined
  if (record.variable !== binding.path.node) return undefined

  return makeResolved(typeReferences, flowType)
}

export function resolveMemberExpression<T>(
  typeReferences: RecognizedTypeReferences,
  path: NodePath<T>,
  member: t.Expression
): t.MemberExpression | t.Identifier | undefined {
  const flowType = convertMemberExpressionToQualifiedTypeIdentifier(member)
  if (!flowType) return undefined
  const resolved = resolveQualifiedTypeIdentifier(typeReferences, path, flowType)
  if (!resolved) return undefined
  return convertTSEntityNameToMemberExpression(resolved)
}

export function resolveGenericTypeAnnotation<T>(
  state: State,
  path: NodePath<T>,
  flowType: t.GenericTypeAnnotation
): t.TSTypeReference | t.TSTypeQuery | undefined {
  let entity = resolveQualifiedTypeIdentifier(state.typeReferences, path, flowType.id)

  if (!entity) {
    /*
     when flowType references an "import x" or ""import * as x",
     typeof is necessary to turn x into a TypeScript type
     */
    if (flowType.id.type === "Identifier") {
      const binding = path.scope.getBinding(flowType.id.name)
      if (binding) {
        switch (binding.path.node.type) {
          case "ImportDefaultSpecifier":
          case "ImportNamespaceSpecifier": {
            entity = t.identifier(flowType.id.name)
            break
          }
        }
      }
    }
  }

  if (!entity) {
    return undefined
  }

  let tsParams: t.TSTypeParameterInstantiation | undefined
  if (flowType.typeParameters) {
    /*
     if this GenericTypeAnnotation is in TypeofTypeAnnotation, typeParameters.params has not been translated.
     so we just pretend that they are translated,
     and let babel calls our visitor after doing path.replaceWith in TypeofTypeAnnotation handler.
     */
    tsParams = t.tsTypeParameterInstantiation(<t.TSType[]>(<unknown>flowType.typeParameters.params))
  } else {
    /*
     This is illegal for describing a base class or base interface,
     so we don't need to take care of resolveQualifiedTypeIdentifier and resolveMemberExpression

     in the context of `const x = require(y)`,
     x could also be used as a type,
     so typeof is required in TypeScript
     */
    if (entity.type === "Identifier") {
      // when entity is not undefined, it is a resolved type, which means the name is in global context
      // except when this identifier is a class
      if (state.typeReferences.imports[entity.name]) {
        let needTypeof = true;
        if (state.hintFile && entity.name[0] === "$") {
          const hintTypeofs = state.hintFile.typeofs[entity.name];
          if (hintTypeofs) {
            // if $x exists in an import, it will not be overrided due to flow compiler's feature
            // so let's assume there is only one record in hintTypeofs
            for (const hintTypeof of hintTypeofs) {
              if (hintTypeof.type === 'class') {
                needTypeof = false;
                break;
              }
            }
          }
        }

        if (needTypeof) {
          return t.tsTypeQuery(entity)
        }
      }
    } else {
      // when entity is A.B, and A is a value
      // "typeof" should be added before A.B
      // I guess this is flow's feature
      if (state.hintFile) {
        let firstId: t.Identifier;
        let qualified = entity;
        while (true) {
          if (qualified.left.type === 'Identifier') {
            firstId = qualified.left;
            break;
          } else {
            qualified = qualified.left;
          }
        }

        let skipTypeof = false;
        const importStat = state.typeReferences.imports[firstId.name];
        if (importStat !== undefined && importStat.type === "VariableDeclarator") {
          // ignore if the first identifier is "React"
          const requireDecl = isRequireDeclaration(importStat);
          if (requireDecl !== undefined && requireDecl[1].value === "react") {
            skipTypeof = true;
          }
        }

        if (!skipTypeof) {
          let needTypeof = false;
          const hintTypeofs = state.hintFile.typeofs[firstId.name];
          if (hintTypeofs) {
            // in this situation, a value chould only be imported
            // so let's assume there is only one record in hintTypeofs
            for (const hintTypeof of hintTypeofs) {
              if (hintTypeof.type === 'value') {
                needTypeof = true;
                break;
              }
            }
          }

          if (needTypeof) {
            return t.tsTypeQuery(entity)
          }
        }
      }
    }
  }

  return t.tsTypeReference(entity, tsParams)
}
