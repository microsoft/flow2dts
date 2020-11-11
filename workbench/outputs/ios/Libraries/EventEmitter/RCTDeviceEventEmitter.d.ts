// @flow
import EventEmitter from "../vendor/emitter/EventEmitter";
import EmitterSubscription from "../vendor/emitter/_EmitterSubscription";
import EventSubscriptionVendor from "../vendor/emitter/_EventSubscriptionVendor";
declare class RCTDeviceEventEmitter extends EventEmitter {
  sharedSubscriber: EventSubscriptionVendor;
  constructor();
  addListener(eventType: string, listener: Function, context: null | undefined | Object): EmitterSubscription;
  removeAllListeners(eventType: null | undefined | string): void;
  removeSubscription(subscription: EmitterSubscription): void;
}
declare export default RCTDeviceEventEmitter;