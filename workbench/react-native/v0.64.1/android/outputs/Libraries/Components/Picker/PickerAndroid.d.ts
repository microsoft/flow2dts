import { Stringish } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import { ColorValue } from "../../StyleSheet/StyleSheet";
import { TextStyleProp } from "../../StyleSheet/StyleSheet";
declare type PickerItemValue = number | string;
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  accessibilityLabel?: null | undefined | Stringish;
  children?: React.Node;
  style?: null | undefined | TextStyleProp;
  backgroundColor?: null | undefined | ColorValue;
  selectedValue?: null | undefined | PickerItemValue;
  enabled?: null | undefined | boolean;
  mode?: null | undefined | ("dialog" | "dropdown");
  onValueChange?: null | undefined | ((itemValue: null | undefined | PickerItemValue, itemIndex: number) => unknown);
  prompt?: null | undefined | string;
  testID?: string;
}>;
declare function PickerAndroid(props: Props): React.Node;
declare const $f2tExportDefault: typeof PickerAndroid;
export default $f2tExportDefault;