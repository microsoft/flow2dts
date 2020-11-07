import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var Blob: $TypeOf<typeof $1>;
declare const $1;
declare var FormData: $TypeOf<typeof $2>;
declare const $2;
declare type RequestBody = string | Blob | FormData | {
  uri: string;
} | ArrayBuffer | $ArrayBufferView;
declare function convertRequestBody(body: RequestBody) => Object;
export type { RequestBody };
declare const $f2tExportDefault: $TypeOf<typeof convertRequestBody>;
export default $f2tExportDefault;