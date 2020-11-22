import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "../Renderer/shims/createReactNativeComponentClass";
declare namespace $f2tExportDefaultRedirect {
  export const $f2tHidden_createReactNativeComponentClass: $TypeOf<typeof $1>;
}
declare namespace $f2tExportDefault {
  export const createReactNativeComponentClass: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_createReactNativeComponentClass>;
  export type createReactNativeComponentClass = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_createReactNativeComponentClass>;
}
export default $f2tExportDefault;