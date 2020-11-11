import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare class Dimensions {
  get(dim: string): Object;
  set(dims: Readonly<{
    [key: string]: any;
  }>): void;
  addEventListener(type: "change", handler: Function): void;
  removeEventListener(type: "change", handler: Function): void;
}
declare const $f2tExportDefault: $TypeOf<typeof Dimensions>;
export default $f2tExportDefault;