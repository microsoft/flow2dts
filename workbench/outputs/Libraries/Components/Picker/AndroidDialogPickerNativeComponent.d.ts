// @flow
import * as React from "react";
import { DirectEventHandler } from "../../Types/CodegenTypes";
import { Int32 } from "../../Types/CodegenTypes";
import { WithDefault } from "../../Types/CodegenTypes";
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import { TextStyleProp } from "../../StyleSheet/StyleSheet";
import { ColorValue } from "../../StyleSheet/StyleSheetTypes";
import { ProcessedColorValue } from "../../StyleSheet/processColor";
import { ViewProps } from "../../Components/View/ViewPropTypes";
declare type PickerItem = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  label: string;
  color?: null | undefined | ProcessedColorValue;
}>;
declare type PickerItemSelectEvent = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  position: Int32;
}>;
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  style?: null | undefined | TextStyleProp;
  // Props
  color?: null | undefined | ColorValue;
  backgroundColor?: null | undefined | ColorValue;
  enabled?: WithDefault;
  items: ReadonlyArray<PickerItem>;
  prompt?: WithDefault;
  selected: Int32;
  // Events
  onSelect?: DirectEventHandler;
}>;
declare type NativeType = HostComponent;
interface NativeCommands {
  readonly setNativeSelectedPosition: (viewRef: React.ElementRef<NativeType>, index: number) => void;
}
declare var Commands: NativeCommands;
export { Commands };
declare export default NativeType;