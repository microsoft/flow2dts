import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var EventEmitter: $TypeOf<typeof $2>;
declare const $2;
declare var NativeEventEmitter: $TypeOf<typeof $4>;
declare const $4;
declare class AppState extends $1 {
  currentState: null | undefined | string;
  isAvailable: boolean;
  constructor: () => void;
  // TODO: now that AppState is a subclass of NativeEventEmitter, we could
  // deprecate `addEventListener` and `removeEventListener` and just use
  // addListener` and `listener.remove()` directly. That will be a breaking
  // change though, as both the method and event names are different
  // (addListener events are currently required to be globally unique).

  /**
   * Add a handler to AppState changes by listening to the `change` event type
   * and providing the handler.
   *
   * See https://reactnative.dev/docs/appstate.html#addeventlistener
   */
  addEventListener: (type: string, handler: Function) => void;

  /**
   * Remove a handler by passing the `change` event type and the handler.
   *
   * See https://reactnative.dev/docs/appstate.html#removeeventlistener
   */
  removeEventListener: (type: string, handler: Function) => void;
}
declare var $1: $TypeOf<typeof NativeEventEmitter>;
declare class MissingNativeAppStateShim extends $3 {
  // AppState
  isAvailable: boolean;
  currentState: null | undefined | string;
  addEventListener: (type: string, handler: Function) => void;
  removeEventListener: (type: string, handler: Function) => void;
  // EventEmitter
  addListener: () => void;
  removeAllListeners: () => void;
  removeSubscription: () => void;
}
declare var $3: $TypeOf<typeof EventEmitter>;
declare var AppStateInstance: AppState | MissingNativeAppStateShim;
declare const $f2tExportDefault: $TypeOf<typeof AppStateInstance>;
export default $f2tExportDefault;