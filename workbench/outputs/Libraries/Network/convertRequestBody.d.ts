declare const Blob;
declare const FormData;
declare type RequestBody = string | Blob | FormData | {
  uri: string;
} | ArrayBuffer | $ArrayBufferView;
declare function convertRequestBody(body: RequestBody) => Object;
export type { RequestBody };
declare const $f2tExportDefault: typeof convertRequestBody;
export default $f2tExportDefault;