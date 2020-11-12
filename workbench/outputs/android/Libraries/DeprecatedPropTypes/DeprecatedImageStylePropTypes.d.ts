import { $TypeOf, React$PropType$Primitive } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "./DeprecatedLayoutPropTypes";
import $3 from "./DeprecatedShadowPropTypesIOS";
import $4 from "./DeprecatedTransformPropTypes";
import $5 from "prop-types";
declare var ImageStylePropTypes:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
typeof $2 & typeof $3 & typeof $4 & {
  resizeMode: React$PropType$Primitive<"center" | "contain" | "cover" | "repeat" | "stretch">;
  backfaceVisibility: React$PropType$Primitive<"visible" | "hidden">;
  backgroundColor: typeof $1;
  borderColor: typeof $1;
  borderWidth: $5.number;
  borderRadius: $5.number;
  overflow: React$PropType$Primitive<"visible" | "hidden">;

  /**
   * Changes the color of all the non-transparent pixels to the tintColor.
   */
  tintColor: typeof $1;
  opacity: $5.number;

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
  overlayColor: $5.string;
  // Android-Specific styles
  borderTopLeftRadius: $5.number;
  borderTopRightRadius: $5.number;
  borderBottomLeftRadius: $5.number;
  borderBottomRightRadius: $5.number;
};
declare const $f2tExportDefault: $TypeOf<typeof ImageStylePropTypes>;
export default $f2tExportDefault;