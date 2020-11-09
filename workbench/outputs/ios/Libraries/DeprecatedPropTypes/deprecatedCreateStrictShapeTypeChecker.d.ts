import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare function deprecatedCreateStrictShapeTypeChecker(shapeTypes: {
  [key: string]: ReactPropsCheckType;
}): ReactPropsChainableTypeChecker;
declare const $f2tExportDefault: $TypeOf<typeof deprecatedCreateStrictShapeTypeChecker>;
export default $f2tExportDefault;