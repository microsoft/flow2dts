import $1 from "../../EventEmitter/NativeEventEmitter";
import EmitterSubscription$f2tTypeof from "../../vendor/emitter/EmitterSubscription";
declare type EmitterSubscription = typeof EmitterSubscription$f2tTypeof;
declare class TVEventHandler {
  __nativeTVNavigationEventListener?: null | undefined | EmitterSubscription;
  __nativeTVNavigationEventEmitter?: null | undefined | typeof $1;
  enable(component: null | undefined | any, callback: Function): void;
  disable(): void;
}
declare const $f2tExportDefault: TVEventHandler;
export default $f2tExportDefault;