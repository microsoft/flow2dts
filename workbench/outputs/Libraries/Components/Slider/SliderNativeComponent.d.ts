import { BubblingEventHandler } from "../../Types/CodegenTypes";
import { DirectEventHandler } from "../../Types/CodegenTypes";
import { Double } from "../../Types/CodegenTypes";
import { WithDefault } from "../../Types/CodegenTypes";
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import { ColorValue } from "../../StyleSheet/StyleSheetTypes";
import { ImageSource } from "../../Image/ImageSource";
import { ViewProps } from "../View/ViewPropTypes";
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
  disabled?: WithDefault;
  enabled?: WithDefault;
  maximumTrackImage?: null | undefined | ImageSource;
  maximumTrackTintColor?: null | undefined | ColorValue;
  maximumValue?: WithDefault;
  minimumTrackImage?: null | undefined | ImageSource;
  minimumTrackTintColor?: null | undefined | ColorValue;
  minimumValue?: WithDefault;
  step?: WithDefault;
  testID?: WithDefault;
  thumbImage?: null | undefined | ImageSource;
  thumbTintColor?: null | undefined | ColorValue;
  trackImage?: null | undefined | ImageSource;
  value?: WithDefault;
  // Events
  onChange?: null | undefined | BubblingEventHandler;
  onValueChange?: null | undefined | BubblingEventHandler;
  onSlidingComplete?: null | undefined | DirectEventHandler;
}>;
declare export default HostComponent;