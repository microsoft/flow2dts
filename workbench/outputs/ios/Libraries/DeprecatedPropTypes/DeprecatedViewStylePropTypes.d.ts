import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "./DeprecatedLayoutPropTypes";
import $3 from "./DeprecatedShadowPropTypesIOS";
import $4 from "./DeprecatedTransformPropTypes";
import $5 from "prop-types";
declare var DeprecatedViewStylePropTypes:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
$2 & $3 & $4 & {
  backfaceVisibility: React$PropType$Primitive<"visible" | "hidden">;
  backgroundColor: $1;
  borderColor: $1;
  borderTopColor: $1;
  borderRightColor: $1;
  borderBottomColor: $1;
  borderLeftColor: $1;
  borderStartColor: $1;
  borderEndColor: $1;
  borderRadius: $5.number;
  borderTopLeftRadius: $5.number;
  borderTopRightRadius: $5.number;
  borderTopStartRadius: $5.number;
  borderTopEndRadius: $5.number;
  borderBottomLeftRadius: $5.number;
  borderBottomRightRadius: $5.number;
  borderBottomStartRadius: $5.number;
  borderBottomEndRadius: $5.number;
  borderStyle: React$PropType$Primitive<"solid" | "dotted" | "dashed">;
  borderWidth: $5.number;
  borderTopWidth: $5.number;
  borderRightWidth: $5.number;
  borderBottomWidth: $5.number;
  borderLeftWidth: $5.number;
  opacity: $5.number;

  /**
   * (Android-only) Sets the elevation of a view, using Android's underlying
   * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
   * This adds a drop shadow to the item and affects z-order for overlapping views.
   * Only supported on Android 5.0+, has no effect on earlier versions.
   * @platform android
   */
  elevation: $5.number;
};
declare const $f2tExportDefault: $TypeOf<typeof DeprecatedViewStylePropTypes>;
export default $f2tExportDefault;