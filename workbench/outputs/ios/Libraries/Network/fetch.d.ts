import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare namespace $f2tExportDefaultRedirect {
  export declare const $f2tHidden_fetch: $TypeOf<typeof fetch>;
  export declare const $f2tHidden_Headers: $TypeOf<typeof Headers>;
  export declare const $f2tHidden_Request: $TypeOf<typeof Request>;
  export declare const $f2tHidden_Response: $TypeOf<typeof Response>;
}
declare namespace $f2tExportDefault {
  export declare const fetch: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_fetch>;
  export declare const Headers: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_Headers>;
  export declare const Request: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_Request>;
  export declare const Response: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_Response>;
}
export default $f2tExportDefault;