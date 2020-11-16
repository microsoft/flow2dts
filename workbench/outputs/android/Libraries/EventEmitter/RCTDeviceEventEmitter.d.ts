import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import EventEmitter from "../vendor/emitter/EventEmitter";
import EmitterSubscription$f2tTypeof from "../vendor/emitter/_EmitterSubscription";
declare type EmitterSubscription = $TypeOf<typeof EmitterSubscription$f2tTypeof>;
import EventSubscriptionVendor from "../vendor/emitter/_EventSubscriptionVendor";
declare class RCTDeviceEventEmitter extends EventEmitter {
  sharedSubscriber: $TypeOf<typeof EventSubscriptionVendor>;
  constructor();
  addListener(eventType: string, listener: Function, context: null | undefined | Object): EmitterSubscription;
  removeAllListeners(eventType: null | undefined | string): void;
  removeSubscription(subscription: EmitterSubscription): void;
}
declare const $f2tExportDefault: RCTDeviceEventEmitter;
export default $f2tExportDefault;