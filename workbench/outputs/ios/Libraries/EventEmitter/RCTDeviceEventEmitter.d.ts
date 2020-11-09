import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import EventEmitter from "../vendor/emitter/EventEmitter";
import EmitterSubscription from "../vendor/emitter/_EmitterSubscription";
import EventSubscriptionVendor from "../vendor/emitter/_EventSubscriptionVendor";
declare class RCTDeviceEventEmitter extends $1 {
  sharedSubscriber: EventSubscriptionVendor;
  constructor: () => void;
  addListener: (eventType: string, listener: Function, context: null | undefined | Object) => EmitterSubscription;
  removeAllListeners: (eventType: null | undefined | string) => void;
  removeSubscription: (subscription: EmitterSubscription) => void;
}
declare var $1: $TypeOf<typeof EventEmitter>;
declare export default RCTDeviceEventEmitter;