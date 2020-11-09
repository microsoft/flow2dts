import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { HostComponent } from "../Renderer/shims/ReactNativeTypes";
declare var requireNativeComponent: <T>(uiViewClassName: string) => HostComponent<T>;
declare const $f2tExportDefault: $TypeOf<typeof requireNativeComponent>;
export default $f2tExportDefault;