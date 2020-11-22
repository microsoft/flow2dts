import { $ArrayBufferView, $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "../Blob/Blob";
import $2 from "./FormData";
declare type RequestBody = string | $TypeOf<typeof $1> | $TypeOf<typeof $2> | {
  uri: string;
} | ArrayBuffer | $ArrayBufferView;
declare function convertRequestBody(body: RequestBody): Object;
export type { RequestBody };
declare const $f2tExportDefault: $TypeOf<typeof convertRequestBody>;
export default $f2tExportDefault;