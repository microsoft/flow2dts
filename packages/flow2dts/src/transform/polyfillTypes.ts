import { types as t } from "@babel/core"

const BRIDGING_TYPES = ["$TypeOf"] as const
const FLOW_UTILITY_TYPES_LOCAL = ["$FlowFixMe", "$FlowFixMeProps", "React$PropType$Primitive", "Stringish"] as const
const FLOW_UTILITY_TYPES_UPSTREAM = [
  "$Call",
  "$Diff",
  "$ElementType",
  "$Keys",
  "$PropertyType",
  "$NonMaybeType",
  "$Shape",
  "Class",
] as const

export const POLYFILL_TYPES = [...BRIDGING_TYPES, ...FLOW_UTILITY_TYPES_LOCAL, ...FLOW_UTILITY_TYPES_UPSTREAM]

const TYPES: Record<string, string[]> = {
  "flow2dts-flow-types-polyfill": [...BRIDGING_TYPES, ...FLOW_UTILITY_TYPES_LOCAL],
  "utility-types": [...FLOW_UTILITY_TYPES_UPSTREAM],
}

export function isPolyFilledType(name: string): name is typeof POLYFILL_TYPES[number] {
  return POLYFILL_TYPES.includes(name as any)
}

export function polyfillTypes(typeNames: Set<typeof POLYFILL_TYPES[number]>) {
  const result: t.ImportDeclaration[] = []
  Object.keys(TYPES).forEach((packageName) => {
    const packageTypeNames = TYPES[packageName]
    const importTypes = Array.from(typeNames).filter((typeName) => packageTypeNames.includes(typeName))
    if (importTypes.length > 0) {
      result.push(
        t.importDeclaration(
          importTypes.sort().map((typeName) => t.importSpecifier(t.identifier(typeName), t.identifier(typeName))),
          t.stringLiteral(packageName)
        )
      )
    }
  })
  return result
}
