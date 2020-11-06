// @flow
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import { TextInputNativeCommands } from "./TextInputNativeCommands";
declare type NativeType = HostComponent;
declare type NativeCommands = TextInputNativeCommands;
declare var Commands: NativeCommands;
declare var SinglelineTextInputNativeComponent: HostComponent;
export { Commands };
declare export default typeof SinglelineTextInputNativeComponent;