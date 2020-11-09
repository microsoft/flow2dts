import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import { TextInputNativeCommands } from "./TextInputNativeCommands";
declare type NativeType = HostComponent<unknown>;
declare type NativeCommands = TextInputNativeCommands<NativeType>;
declare var Commands: NativeCommands;
declare var SinglelineTextInputNativeComponent: HostComponent<unknown>;
export { Commands };
declare export default $TypeOf<typeof SinglelineTextInputNativeComponent>;