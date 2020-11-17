export const polyfillPackagesAndTypes: Record<string, string[]> = {
  "flow2dts-flow-types-polyfill": [
    "$TypeOf",
    "$ArrayBufferView",
    "$FlowFixMe",
    "$FlowFixMeProps",
    "React$ComponentType",
    "React$Context",
    "React$Element",
    "React$PropType$Primitive",
    "ReactPropsCheckType",
    "ReactPropsChainableTypeChecker",
    "Stringish",
  ],
  "utility-types": ["$Call", "$Diff", "$ElementType", "$Keys", "$PropertyType", "$NonMaybeType", "$Shape", "Class"],
}
