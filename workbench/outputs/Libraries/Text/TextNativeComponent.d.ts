// @flow
import { HostComponent } from "../Renderer/shims/ReactNativeTypes";
import { ProcessedColorValue } from "../StyleSheet/processColor";
import { TextProps } from "./TextProps";
declare type NativeTextProps = Readonly<TextProps & {
  isHighlighted?: null | undefined | boolean;
  selectionColor?: null | undefined | ProcessedColorValue;
}>;
declare var NativeText: HostComponent;
declare var NativeVirtualText: HostComponent;
export { NativeText };
export { NativeVirtualText };