import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var NativeEventEmitter: $TypeOf<typeof $1>;
import $1 from "../../EventEmitter/NativeEventEmitter";
import EmitterSubscription from "../../vendor/emitter/EmitterSubscription";
declare class TVEventHandler {
  __nativeTVNavigationEventListener: null | undefined | EmitterSubscription;
  __nativeTVNavigationEventEmitter: null | undefined | NativeEventEmitter;
  enable: (component: null | undefined | any, callback: Function) => void;
  disable: () => void;
}
declare const $f2tExportDefault: $TypeOf<typeof TVEventHandler>;
export default $f2tExportDefault;