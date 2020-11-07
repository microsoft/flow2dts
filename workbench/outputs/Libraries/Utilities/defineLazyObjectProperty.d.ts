import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare function defineLazyObjectProperty<T>(object: Object, name: string, descriptor: {
  get: () => T;
  enumerable?: boolean;
  writable?: boolean;
}) => void;
declare const $f2tExportDefault: $TypeOf<typeof defineLazyObjectProperty>;
export default $f2tExportDefault;