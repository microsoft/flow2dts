import { $TypeOf, React$PropType$Primitive } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "./DeprecatedLayoutPropTypes";
import $3 from "./DeprecatedShadowPropTypesIOS";
import $4 from "./DeprecatedTransformPropTypes";
import $5 from "prop-types";
declare var DeprecatedViewStylePropTypes:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
$TypeOf<typeof $2> & $TypeOf<typeof $3> & $TypeOf<typeof $4> & {
  backfaceVisibility: React$PropType$Primitive<"visible" | "hidden">;
  backgroundColor: $TypeOf<typeof $1>;
  borderColor: $TypeOf<typeof $1>;
  borderTopColor: $TypeOf<typeof $1>;
  borderRightColor: $TypeOf<typeof $1>;
  borderBottomColor: $TypeOf<typeof $1>;
  borderLeftColor: $TypeOf<typeof $1>;
  borderStartColor: $TypeOf<typeof $1>;
  borderEndColor: $TypeOf<typeof $1>;
  borderRadius: $TypeOf<typeof $5.number>;
  borderTopLeftRadius: $TypeOf<typeof $5.number>;
  borderTopRightRadius: $TypeOf<typeof $5.number>;
  borderTopStartRadius: $TypeOf<typeof $5.number>;
  borderTopEndRadius: $TypeOf<typeof $5.number>;
  borderBottomLeftRadius: $TypeOf<typeof $5.number>;
  borderBottomRightRadius: $TypeOf<typeof $5.number>;
  borderBottomStartRadius: $TypeOf<typeof $5.number>;
  borderBottomEndRadius: $TypeOf<typeof $5.number>;
  borderStyle: React$PropType$Primitive<"solid" | "dotted" | "dashed">;
  borderWidth: $TypeOf<typeof $5.number>;
  borderTopWidth: $TypeOf<typeof $5.number>;
  borderRightWidth: $TypeOf<typeof $5.number>;
  borderBottomWidth: $TypeOf<typeof $5.number>;
  borderLeftWidth: $TypeOf<typeof $5.number>;
  opacity: $TypeOf<typeof $5.number>;

  /**
   * (Android-only) Sets the elevation of a view, using Android's underlying
   * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
   * This adds a drop shadow to the item and affects z-order for overlapping views.
   * Only supported on Android 5.0+, has no effect on earlier versions.
   * @platform android
   */
  elevation: $TypeOf<typeof $5.number>;
};
declare const $f2tExportDefault: typeof DeprecatedViewStylePropTypes;
export default $f2tExportDefault;