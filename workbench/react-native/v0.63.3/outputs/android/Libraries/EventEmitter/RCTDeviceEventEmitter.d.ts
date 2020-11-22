import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "../vendor/emitter/EventEmitter";
import $2 from "../vendor/emitter/EventSubscriptionVendor";
import EmitterSubscription$f2tTypeof from "../vendor/emitter/EmitterSubscription";
declare type EmitterSubscription = $TypeOf<typeof EmitterSubscription$f2tTypeof>;
declare class RCTDeviceEventEmitter extends $1 {
  sharedSubscriber: $TypeOf<typeof $2>;
  constructor();
  addListener(eventType: string, listener: Function, context: null | undefined | Object): EmitterSubscription;
  removeAllListeners(eventType: null | undefined | string): void;
  removeSubscription(subscription: EmitterSubscription): void;
}
export default RCTDeviceEventEmitter;