// @flow
import type { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import type { ViewProps } from "../View/ViewPropTypes";
import type { BubblingEventHandler } from "../../Types/CodegenTypes";
import type { WithDefault } from "../../Types/CodegenTypes";
import type { Int32 } from "../../Types/CodegenTypes";
import type { ColorValue } from "../../StyleSheet/StyleSheet";
declare type OnChangeEvent = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  value: Int32;
  selectedSegmentIndex: Int32;
}>;
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  // Props
  values?: ReadonlyArray<string>;
  selectedIndex?: WithDefault<Int32, 0>;
  enabled?: WithDefault<boolean, true>;
  tintColor?: null | undefined | ColorValue;
  textColor?: null | undefined | ColorValue;
  backgroundColor?: null | undefined | ColorValue;
  momentary?: WithDefault<boolean, false>;
  // Events
  onChange?: null | undefined | BubblingEventHandler<OnChangeEvent>;
}>;
export type { OnChangeEvent };
declare const $f2tExportDefault: HostComponent<NativeProps>;
export default $f2tExportDefault;