import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import type { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import type { TextInputNativeCommands } from "./TextInputNativeCommands";
declare type NativeType = HostComponent<unknown>;
declare type NativeCommands = TextInputNativeCommands<NativeType>;
declare var Commands: NativeCommands;
declare var SinglelineTextInputNativeComponent: HostComponent<unknown>;
export { Commands };
declare const $f2tExportDefault: $TypeOf<typeof SinglelineTextInputNativeComponent>;
export default $f2tExportDefault;