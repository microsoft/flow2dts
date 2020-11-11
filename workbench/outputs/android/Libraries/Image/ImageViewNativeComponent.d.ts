// @flow
import type { DangerouslyImpreciseStyle } from "../StyleSheet/StyleSheet";
import type { ResolvedAssetSource } from "./AssetSourceResolver";
import type { HostComponent } from "../Renderer/shims/ReactNativeTypes";
import type { ImageProps } from "./ImageProps";
import type { ViewProps } from "../Components/View/ViewPropTypes";
import type { ImageStyleProp } from "../StyleSheet/StyleSheet";
import type { ColorValue } from "../StyleSheet/StyleSheet";
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ImageProps & ViewProps & {
  style?: ImageStyleProp | DangerouslyImpreciseStyle;
  // iOS native props
  tintColor?: ColorValue;
  // Android native props
  shouldNotifyLoadEvents?: boolean;
  src?: (null | undefined | ResolvedAssetSource) | ReadonlyArray<{
    uri: string;
  }>;
  headers?: null | undefined | string;
  defaultSrc?: null | undefined | string;
  loadingIndicatorSrc?: null | undefined | string;
}>;
declare const $f2tExportDefault: HostComponent<NativeProps>;
export default $f2tExportDefault;