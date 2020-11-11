// @flow
import type { BubblingEventHandler } from "../../Types/CodegenTypes";
import type { DirectEventHandler } from "../../Types/CodegenTypes";
import type { Double } from "../../Types/CodegenTypes";
import type { WithDefault } from "../../Types/CodegenTypes";
import type { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import type { ColorValue } from "../../StyleSheet/StyleSheet";
import type { ImageSource } from "../../Image/ImageSource";
import type { ViewProps } from "../View/ViewPropTypes";
declare type Event = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  value: Double;
  fromUser?: boolean;
}>;
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  // Props
  disabled?: WithDefault<boolean, false>;
  enabled?: WithDefault<boolean, true>;
  maximumTrackImage?: null | undefined | ImageSource;
  maximumTrackTintColor?: null | undefined | ColorValue;
  maximumValue?: WithDefault<Double, 1>;
  minimumTrackImage?: null | undefined | ImageSource;
  minimumTrackTintColor?: null | undefined | ColorValue;
  minimumValue?: WithDefault<Double, 0>;
  step?: WithDefault<Double, 0>;
  testID?: WithDefault<string, "">;
  thumbImage?: null | undefined | ImageSource;
  thumbTintColor?: null | undefined | ColorValue;
  trackImage?: null | undefined | ImageSource;
  value?: WithDefault<Double, 0>;
  // Events
  onChange?: null | undefined | BubblingEventHandler<Event>;
  onValueChange?: null | undefined | BubblingEventHandler<Event, "paperValueChange">;
  onSlidingComplete?: null | undefined | DirectEventHandler<Event, "paperSlidingComplete">;
}>;
declare const $f2tExportDefault: HostComponent<NativeProps>;
export default $f2tExportDefault;