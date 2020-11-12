import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare namespace $f2tExportDefaultRedirect {
  export const $f2tHidden_fetch: $TypeOf<typeof fetch>;
  export const $f2tHidden_Headers: $TypeOf<typeof Headers>;
  export const $f2tHidden_Request: $TypeOf<typeof Request>;
  export const $f2tHidden_Response: $TypeOf<typeof Response>;
}
declare namespace $f2tExportDefault {
  export const fetch: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_fetch>;
  export type fetch = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_fetch>;
  export const Headers: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_Headers>;
  export type Headers = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_Headers>;
  export const Request: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_Request>;
  export type Request = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_Request>;
  export const Response: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_Response>;
  export type Response = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_Response>;
}
export default $f2tExportDefault;