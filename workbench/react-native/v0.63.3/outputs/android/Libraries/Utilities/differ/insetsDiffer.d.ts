import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type Inset = {
  top: null | undefined | number;
  left: null | undefined | number;
  right: null | undefined | number;
  bottom: null | undefined | number;
};
declare var insetsDiffer: (one: Inset, two: Inset) => boolean;
declare const $f2tExportDefault: $TypeOf<typeof insetsDiffer>;
export default $f2tExportDefault;