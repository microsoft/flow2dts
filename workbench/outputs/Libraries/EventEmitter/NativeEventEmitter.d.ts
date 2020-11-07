import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var EventEmitter: $TypeOf<typeof $1>;
declare const $1;
import EmitterSubscription from "../vendor/emitter/EmitterSubscription";
declare type NativeModule = {
  readonly addListener: (eventType: string) => void;
  readonly removeListeners: (count: number) => void;
};
declare class NativeEventEmitter extends $2 {
  constructor: (nativeModule: null | undefined | NativeModule) => void;
  addListener: (eventType: string, listener: Function, context: null | undefined | Object) => EmitterSubscription;
  removeAllListeners: (eventType: string) => void;
  removeSubscription: (subscription: EmitterSubscription) => void;
}
declare var $2: $TypeOf<typeof EventEmitter>;
declare const $f2tExportDefault: $TypeOf<typeof NativeEventEmitter>;
export default $f2tExportDefault;