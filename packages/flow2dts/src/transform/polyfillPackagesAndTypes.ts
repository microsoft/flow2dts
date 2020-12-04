// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const polyfillPackagesAndTypes: Record<string, string[]> = {
  "flow2dts-flow-types-polyfill": [
    "$TypeOf",
    "$TEMPORARY$module$exports$assign",
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
  "utility-types": ["$Diff", "$ElementType", "$Keys", "$PropertyType", "$NonMaybeType", "$Shape", "Class"],
}
