import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "../../EventEmitter/NativeEventEmitter";
import EmitterSubscription$f2tTypeof from "../../vendor/emitter/EmitterSubscription";
declare type EmitterSubscription = $TypeOf<typeof EmitterSubscription$f2tTypeof>;
declare class TVEventHandler {
  __nativeTVNavigationEventListener?: null | undefined | EmitterSubscription;
  __nativeTVNavigationEventEmitter?: null | undefined | $TypeOf<typeof $1>;
  enable(component: null | undefined | any, callback: Function): void;
  disable(): void;
}
export default TVEventHandler;