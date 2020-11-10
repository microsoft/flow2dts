import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "./DeprecatedViewStylePropTypes";
import $3 from "prop-types";
declare var DeprecatedTextStylePropTypes:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
$2 & {
  color: $1;
  fontFamily: $3.string;
  fontSize: $3.number;
  fontStyle: React$PropType$Primitive<"normal" | "italic">;

  /**
   * Specifies font weight. The values 'normal' and 'bold' are supported for
   * most fonts. Not all fonts have a variant for each of the numeric values,
   * in that case the closest one is chosen.
   */
  fontWeight: React$PropType$Primitive<"normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900">;
  fontVariant: React$PropType$Primitive<("small-caps" | "oldstyle-nums" | "lining-nums" | "tabular-nums" | "proportional-nums")[]>;
  textShadowOffset: React$PropType$Primitive<{
    height?: number;
    width?: number;
  }>;
  textShadowRadius: $3.number;
  textShadowColor: $1;

  /**
   * @platform ios
   */
  letterSpacing: $3.number;
  lineHeight: $3.number;

  /**
   * Specifies text alignment. The value 'justify' is only supported on iOS and
   * fallbacks to `left` on Android.
   */
  textAlign: React$PropType$Primitive<"auto" | "left" | "right" | "center" | "justify">;

  /**
   * @platform android
   */
  textAlignVertical: React$PropType$Primitive<"auto" | "top" | "bottom" | "center">;

  /**
   * Set to `false` to remove extra font padding intended to make space for certain ascenders / descenders.
   * With some fonts, this padding can make text look slightly misaligned when centered vertically.
   * For best results also set `textAlignVertical` to `center`. Default is true.
   * @platform android
   */
  includeFontPadding: $3.bool;
  textDecorationLine: React$PropType$Primitive<"none" | "underline" | "line-through" | "underline line-through">;

  /**
   * @platform ios
   */
  textDecorationStyle: React$PropType$Primitive<"solid" | "double" | "dotted" | "dashed">;

  /**
   * @platform ios
   */
  textDecorationColor: $1;
  textTransform: React$PropType$Primitive<"none" | "capitalize" | "uppercase" | "lowercase">;

  /**
   * @platform ios
   */
  writingDirection: React$PropType$Primitive<"auto" | "ltr" | "rtl">;
};
declare const $f2tExportDefault: $TypeOf<typeof DeprecatedTextStylePropTypes>;
export default $f2tExportDefault;