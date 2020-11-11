// @flow
import type { Float } from "../../Types/CodegenTypes";
import type { WithDefault } from "../../Types/CodegenTypes";
import type { ImageSource } from "../../Image/ImageSource";
import type { ColorValue } from "../../StyleSheet/StyleSheet";
import type { ViewProps } from "../View/ViewPropTypes";
import type { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  // Props
  progressViewStyle?: WithDefault<"default" | "bar", "default">;
  progress?: WithDefault<Float, 0>;
  progressTintColor?: null | undefined | ColorValue;
  trackTintColor?: null | undefined | ColorValue;
  progressImage?: null | undefined | ImageSource;
  trackImage?: null | undefined | ImageSource;
}>;
declare const $f2tExportDefault: HostComponent<NativeProps>;
export default $f2tExportDefault;