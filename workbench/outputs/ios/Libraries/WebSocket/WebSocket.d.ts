import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import Blob from "../Blob/Blob";
declare type ArrayBufferView = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | DataView;
declare type BinaryType = "blob" | "arraybuffer";
declare class WebSocket extends $1 {
  CONNECTING: number;
  OPEN: number;
  CLOSING: number;
  CLOSED: number;
  CONNECTING: number;
  OPEN: number;
  CLOSING: number;
  CLOSED: number;
  onclose: null | undefined | Function;
  onerror: null | undefined | Function;
  onmessage: null | undefined | Function;
  onopen: null | undefined | Function;
  bufferedAmount: number;
  extension: null | undefined | string;
  protocol: null | undefined | string;
  readyState: number;
  url: null | undefined | string;
  constructor: (url: string, protocols: (null | undefined | string) | (null | undefined | string[]), options: null | undefined | {
    headers?: {
      origin?: string;
    };
  }) => void;
  binaryType: () => null | undefined | BinaryType;
  binaryType: (binaryType: BinaryType) => void;
  close: (code?: number, reason?: string) => void;
  send: (data: string | ArrayBuffer | ArrayBufferView | Blob) => void;
  ping: () => void;
}
declare var $1: any;
declare const $f2tExportDefault: $TypeOf<typeof WebSocket>;
export default $f2tExportDefault;