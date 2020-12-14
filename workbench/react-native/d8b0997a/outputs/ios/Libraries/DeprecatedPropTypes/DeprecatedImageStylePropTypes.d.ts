import { React$PropType$Primitive } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "./DeprecatedLayoutPropTypes";
import $3 from "./DeprecatedShadowPropTypesIOS";
import $4 from "./DeprecatedTransformPropTypes";
import $5 from "prop-types";
declare var ImageStylePropTypes:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
typeof DeprecatedLayoutPropTypes & typeof DeprecatedShadowPropTypesIOS & typeof DeprecatedTransformPropTypes & {
  resizeMode: React$PropType$Primitive<"center" | "contain" | "cover" | "repeat" | "stretch">;
  backfaceVisibility: React$PropType$Primitive<"visible" | "hidden">;
  backgroundColor: typeof DeprecatedColorPropType;
  borderColor: typeof DeprecatedColorPropType;
  borderWidth: typeof ReactPropTypes.number;
  borderRadius: typeof ReactPropTypes.number;
  overflow: React$PropType$Primitive<"visible" | "hidden">;

  /**
   * Changes the color of all the non-transparent pixels to the tintColor.
   */
  tintColor: typeof DeprecatedColorPropType;
  opacity: typeof ReactPropTypes.number;

  /**
   * When the image has rounded corners, specifying an overlayColor will
   * cause the remaining space in the corners to be filled with a solid color.
   * This is useful in cases which are not supported by the Android
   * implementation of rounded corners:
   *   - Certain resize modes, such as 'contain'
   *   - Animated GIFs
   *
   * A typical way to use this prop is with images displayed on a solid
   * background and setting the `overlayColor` to the same color
   * as the background.
   *
   * For details of how this works under the hood, see
   * http://frescolib.org/docs/rounded-corners-and-circles.html
   *
   * @platform android
   */
  overlayColor: typeof ReactPropTypes.string;
  // Android-Specific styles
  borderTopLeftRadius: typeof ReactPropTypes.number;
  borderTopRightRadius: typeof ReactPropTypes.number;
  borderBottomLeftRadius: typeof ReactPropTypes.number;
  borderBottomRightRadius: typeof ReactPropTypes.number;
};
declare const $f2tExportDefault: typeof ImageStylePropTypes;
export default $f2tExportDefault;