// @flow
import * as React from "react";
import { WithDefault } from "react-native/Libraries/Types/CodegenTypes";
import { BubblingEventHandler } from "react-native/Libraries/Types/CodegenTypes";
import { HostComponent } from "react-native/Libraries/Renderer/shims/ReactNativeTypes";
import { ColorValue } from "../../StyleSheet/StyleSheet";
import { ViewProps } from "../View/ViewPropTypes";
declare type SwitchChangeEvent = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  value: boolean;
}>;
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  // Props
  disabled?: WithDefault;
  enabled?: WithDefault;
  thumbColor?: null | undefined | ColorValue;
  trackColorForFalse?: null | undefined | ColorValue;
  trackColorForTrue?: null | undefined | ColorValue;
  value?: WithDefault;
  on?: WithDefault;
  thumbTintColor?: null | undefined | ColorValue;
  trackTintColor?: null | undefined | ColorValue;
  // Events
  onChange?: BubblingEventHandler;
}>;
declare type NativeType = HostComponent;
interface NativeCommands {
  readonly setNativeValue: (viewRef: React.ElementRef<NativeType>, value: boolean) => void;
}
declare var Commands: NativeCommands;
export { Commands };
declare export default NativeType;