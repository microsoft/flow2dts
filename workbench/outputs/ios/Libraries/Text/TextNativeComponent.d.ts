// @flow
import type { HostComponent } from "../Renderer/shims/ReactNativeTypes";
import type { ProcessedColorValue } from "../StyleSheet/processColor";
import type { TextProps } from "./TextProps";
declare type NativeTextProps = Readonly<TextProps & {
  isHighlighted?: null | undefined | boolean;
  selectionColor?: null | undefined | ProcessedColorValue;
}>;
declare var NativeText: HostComponent<NativeTextProps>;
declare var NativeVirtualText: HostComponent<NativeTextProps>;
export { NativeText };
export { NativeVirtualText };