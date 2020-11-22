import { $TypeOf } from "flow2dts-flow-types-polyfill";

/**
 * TODO: Figure out why these are not included in the Flow dump
 * See https://github.com/facebook/react-native/blob/e99b8bbb404f8cd1f11b6c7998083be530d7b8a4/Libraries/Components/ProgressBarAndroid/ProgressBarAndroid.android.js#L105-L107
 */
import ProgressBarAndroidNativeComponent from "./ProgressBarAndroidNativeComponent";
import { ViewProps } from "../View/ViewPropTypes";
import { ColorValue } from "../../StyleSheet/StyleSheet";
export declare type ProgressBarAndroidProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & (
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  styleAttr: "Horizontal";
  indeterminate: false;
  progress: number;
} |
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  typeAttr: "Horizontal" | "Normal" | "Small" | "Large" | "Inverse" | "SmallInverse" | "LargeInverse";
  indeterminate: true;
}) & {
  /**
   * Whether to show the ProgressBar (true, the default) or hide it (false).
   */
  animating?: null | undefined | boolean;

  /**
   * Color of the progress bar.
   */
  color?: null | undefined | ColorValue;

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: null | undefined | string;
}>;
declare const $f2tExportDefault: $TypeOf<typeof ProgressBarAndroidNativeComponent>;
export default $f2tExportDefault;