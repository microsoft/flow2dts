import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import EventEmitter from "../vendor/emitter/EventEmitter";
import { EventSubscription } from "../vendor/emitter/EventEmitter";
declare type NativeModule = {
  readonly addListener: (eventType: string) => void;
  readonly removeListeners: (count: number) => void;
};
declare type NativeEventEmitterOptions = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  __SECRET_DISABLE_CALLS_INTO_MODULE_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: boolean;
}>;
declare class NativeEventEmitter extends $1 {
  constructor: (nativeModule: null | undefined | NativeModule, options?: NativeEventEmitterOptions) => void;
  addListener: (eventType: string, listener: Function, context: null | undefined | Object) => EventSubscription;
  removeAllListeners: (eventType: string) => void;
  removeSubscription: (subscription: EventSubscription) => void;
}
declare var $1: $TypeOf<typeof EventEmitter>;
export { NativeEventEmitter as default };