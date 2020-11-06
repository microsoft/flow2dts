// @flow
declare var NativeEventEmitter: typeof $1;
declare const $1;
import EmitterSubscription from "../../vendor/emitter/EmitterSubscription";
declare class TVEventHandler {
  __nativeTVNavigationEventListener: null | undefined | EmitterSubscription;
  __nativeTVNavigationEventEmitter: null | undefined | NativeEventEmitter;
  enable: (component: null | undefined | any, callback: Function) => void;
  disable: () => void;
}
declare const $f2tExportDefault: typeof TVEventHandler;
export default $f2tExportDefault;