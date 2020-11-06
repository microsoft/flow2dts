// @flow
declare var Blob: typeof $1;
declare const $1;
declare var FormData: typeof $2;
declare const $2;
declare type RequestBody = string | Blob | FormData | {
  uri: string;
} | ArrayBuffer | $ArrayBufferView;
declare function convertRequestBody(body: RequestBody) => Object;
export type { RequestBody };
declare const $f2tExportDefault: typeof convertRequestBody;
export default $f2tExportDefault;