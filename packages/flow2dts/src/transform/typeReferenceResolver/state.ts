import { NodePath, types as t } from "@babel/core"
import { assertTSType } from "../utilities"

export interface ReferenceRecord {
  variable: t.DeclareVariable
  original: t.Identifier | t.QualifiedTypeIdentifier
  resolved: t.TSEntityName | null
}

export interface RecognizedTypeReferences {
  records: { [key: string]: ReferenceRecord }
}

export function isRecognized(typeReferences: RecognizedTypeReferences, variable: t.DeclareVariable): boolean {
  return typeReferences.records[variable.id.name]?.variable === variable
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

  return ensureResolved(typeReferences, record)
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
  typeReferences: RecognizedTypeReferences,
  path: NodePath<T>,
  flowType: t.GenericTypeAnnotation
): t.TSTypeReference | undefined {
  const entity = resolveQualifiedTypeIdentifier(typeReferences, path, flowType.id)
  if (!entity) return undefined

  let tsParams: t.TSTypeParameterInstantiation | undefined
  if (flowType.typeParameters) {
    /*
     if this GenericTypeAnnotation is in TypeofTypeAnnotation, typeParameters.params has not been translated.
     so we just pretend that they are translated,
     and let babel calls our visitor after doing path.replaceWith in TypeofTypeAnnotation handler.
     */
    tsParams = t.tsTypeParameterInstantiation(<t.TSType[]>(<unknown>flowType.typeParameters.params))
  }

  return t.tsTypeReference(entity, tsParams)
}
