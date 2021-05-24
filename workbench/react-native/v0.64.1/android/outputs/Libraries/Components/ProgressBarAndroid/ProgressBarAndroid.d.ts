// @flow
import ProgressBarAndroidNativeComponent from "./ProgressBarAndroidNativeComponent";
import { ViewProps } from "../View/ViewPropTypes";
import { ColorValue } from "../../StyleSheet/StyleSheet";
declare type ProgressBarAndroidProps = Readonly<
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
export type { ProgressBarAndroidProps };
declare const $f2tExportDefault: typeof ProgressBarAndroidNativeComponent;
export default $f2tExportDefault;