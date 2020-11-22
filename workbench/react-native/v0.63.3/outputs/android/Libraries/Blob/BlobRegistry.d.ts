import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var register: (id: string) => void;
declare var unregister: (id: string) => void;
declare var has: (id: string) => number | boolean;
declare namespace $f2tExportDefaultRedirect {
  export const $f2tHidden_register: $TypeOf<typeof register>;
  export const $f2tHidden_unregister: $TypeOf<typeof unregister>;
  export const $f2tHidden_has: $TypeOf<typeof has>;
}
declare namespace $f2tExportDefault {
  export const register: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_register>;
  export type register = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_register>;
  export const unregister: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_unregister>;
  export type unregister = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_unregister>;
  export const has: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_has>;
  export type has = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_has>;
}
export default $f2tExportDefault;