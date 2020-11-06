// @flow
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import { TextInputNativeCommands } from "./TextInputNativeCommands";
declare type NativeType = HostComponent;
declare type NativeCommands = TextInputNativeCommands;
declare var Commands: NativeCommands;
export { Commands };
declare export default HostComponent;