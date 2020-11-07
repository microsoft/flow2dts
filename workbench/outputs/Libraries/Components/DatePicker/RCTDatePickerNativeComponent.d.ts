// @flow
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import { ViewProps } from "../View/ViewPropTypes";
import * as React from "react";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { WithDefault } from "react-native/Libraries/Types/CodegenTypes";
import { BubblingEventHandler } from "react-native/Libraries/Types/CodegenTypes";
declare type Event = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  timestamp: Float;
}>;
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  date?: null | undefined | Float;
  initialDate?: null | undefined | Float;
  locale?: null | undefined | string;
  maximumDate?: null | undefined | Float;
  minimumDate?: null | undefined | Float;
  minuteInterval?: WithDefault;
  mode?: WithDefault;
  onChange?: null | undefined | BubblingEventHandler;
  timeZoneOffsetInMinutes?: null | undefined | Float;
}>;
declare type ComponentType = HostComponent;
interface NativeCommands {
  readonly setNativeDate: (viewRef: React.ElementRef<ComponentType>, date: Float) => void;
}
declare var Commands: NativeCommands;
export { Commands };
declare export default HostComponent;