import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import NativeEventEmitter from "../EventEmitter/NativeEventEmitter";
import { NativeResponseType } from "./XMLHttpRequest";
import { RequestBody } from "./convertRequestBody";
declare class RCTNetworking extends $1 {
  constructor: () => void;
  sendRequest: (method: string, trackingName: string, url: string, headers: {}, data: RequestBody, responseType: NativeResponseType, incrementalUpdates: boolean, timeout: number, callback: (requestId: number) => void, withCredentials: boolean) => void;
  abortRequest: (requestId: number) => void;
  clearCookies: (callback: (result: boolean) => void) => void;
}
declare var $1: $TypeOf<typeof NativeEventEmitter>;
declare const $f2tExportDefault: RCTNetworking;
export default $f2tExportDefault;