// @flow
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import { SyntheticEvent } from "../../Types/CoreEventTypes";
import { TextStyleProp } from "../../StyleSheet/StyleSheet";
import { ProcessedColorValue } from "../../StyleSheet/processColor";
import * as React from "react";
declare type PickerIOSChangeEvent = SyntheticEvent;
declare type RCTPickerIOSItemType = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  label: null | undefined | Label;
  value: null | undefined | string;
  textColor: null | undefined | ProcessedColorValue;
}>;
declare type Label = Stringish | number;
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  items: ReadonlyArray<RCTPickerIOSItemType>;
  onChange: (event: PickerIOSChangeEvent) => void;
  selectedIndex: number;
  style?: null | undefined | TextStyleProp;
  testID?: null | undefined | string;
  accessibilityLabel?: null | undefined | string;
}>;
declare type ComponentType = HostComponent;
interface NativeCommands {
  readonly setNativeSelectedIndex: (viewRef: React.ElementRef<ComponentType>, index: number) => void;
}
declare var Commands: NativeCommands;
export { Commands };
declare export default HostComponent;