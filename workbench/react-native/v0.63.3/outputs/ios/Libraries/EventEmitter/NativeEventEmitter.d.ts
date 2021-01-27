import $1 from "../vendor/emitter/EventEmitter";
import EmitterSubscription$f2tTypeof from "../vendor/emitter/EmitterSubscription";
declare type EmitterSubscription = typeof EmitterSubscription$f2tTypeof;
declare type NativeModule = {
  readonly addListener: (eventType: string) => void;
  readonly removeListeners: (count: number) => void;
};
declare class NativeEventEmitter extends $1 {
  constructor(nativeModule?: null | undefined | NativeModule);
  addListener(eventType: string, listener: Function, context?: null | undefined | Object): EmitterSubscription;
  removeAllListeners(eventType: string): void;
  removeSubscription(subscription: EmitterSubscription): void;
}
declare const $f2tExportDefault: NativeEventEmitter;
export default $f2tExportDefault;