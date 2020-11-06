// @flow
declare var EventEmitter: typeof $1;
declare const $1;
declare var EventSubscriptionVendor: typeof $2;
declare const $2;
import EmitterSubscription from "../vendor/emitter/EmitterSubscription";
declare class RCTDeviceEventEmitter extends $3 {
  sharedSubscriber: EventSubscriptionVendor;
  constructor: () => void;
  addListener: (eventType: string, listener: Function, context: null | undefined | Object) => EmitterSubscription;
  removeAllListeners: (eventType: null | undefined | string) => void;
  removeSubscription: (subscription: EmitterSubscription) => void;
}
declare var $3: typeof EventEmitter;
declare const $f2tExportDefault: RCTDeviceEventEmitter;
export default $f2tExportDefault;