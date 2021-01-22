import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type Point = {
  x?: null | undefined | number;
  y?: null | undefined | number;
};
declare var pointsDiffer: (one?: null | undefined | Point, two?: null | undefined | Point) => boolean;
declare const $f2tExportDefault: $TypeOf<typeof pointsDiffer>;
export default $f2tExportDefault;