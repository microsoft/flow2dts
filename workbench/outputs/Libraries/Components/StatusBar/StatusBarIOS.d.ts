import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var NativeEventEmitter: $TypeOf<typeof $1>;
import $1 from "../../EventEmitter/NativeEventEmitter";
declare class StatusBarIOS extends $2 {}
declare var $2: $TypeOf<typeof NativeEventEmitter>;
declare const $f2tExportDefault: StatusBarIOS;
export default $f2tExportDefault;