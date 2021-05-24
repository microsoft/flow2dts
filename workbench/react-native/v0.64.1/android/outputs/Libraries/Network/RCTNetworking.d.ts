// @flow
import NativeEventEmitter from "../EventEmitter/NativeEventEmitter";
import { RequestBody } from "./convertRequestBody";
declare class RCTNetworking extends NativeEventEmitter {
  constructor();
  sendRequest(method: string, trackingName: string, url: string, headers: Object, data: RequestBody, responseType: "text" | "base64", incrementalUpdates: boolean, timeout: number, callback: (requestId: number) => unknown, withCredentials: boolean): void;
  abortRequest(requestId: number): void;
  clearCookies(callback: (result: boolean) => any): void;
}
declare const $f2tExportDefault: RCTNetworking;
export default $f2tExportDefault;