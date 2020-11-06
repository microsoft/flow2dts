declare const EventEmitter;
declare const EventSubscriptionVendor;
import EmitterSubscription from "../vendor/emitter/EmitterSubscription";
declare class RCTDeviceEventEmitter extends EventEmitter {
  sharedSubscriber: EventSubscriptionVendor;
  constructor: () => void;
  addListener: (eventType: string, listener: Function, context: null | undefined | Object) => EmitterSubscription;
  removeAllListeners: (eventType: null | undefined | string) => void;
  removeSubscription: (subscription: EmitterSubscription) => void;
}
declare const $f2tExportDefault: RCTDeviceEventEmitter;
export default $f2tExportDefault;