import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare function polyfillObjectProperty<T>(object: {}, name: string, getValue: () => T): void;
declare function polyfillGlobal<T>(name: string, getValue: () => T): void;
declare namespace $f2tExportDefaultRedirect {
  export const $f2tHidden_polyfillObjectProperty: $TypeOf<typeof polyfillObjectProperty>;
  export const $f2tHidden_polyfillGlobal: $TypeOf<typeof polyfillGlobal>;
}
declare namespace $f2tExportDefault {
  export const polyfillObjectProperty: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_polyfillObjectProperty>;
  export type polyfillObjectProperty = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_polyfillObjectProperty>;
  export const polyfillGlobal: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_polyfillGlobal>;
  export type polyfillGlobal = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_polyfillGlobal>;
}
export default $f2tExportDefault;