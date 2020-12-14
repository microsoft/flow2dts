import { React$PropType$Primitive } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "./DeprecatedLayoutPropTypes";
import $3 from "./DeprecatedShadowPropTypesIOS";
import $4 from "./DeprecatedTransformPropTypes";
import $5 from "prop-types";
declare var DeprecatedViewStylePropTypes:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
typeof DeprecatedLayoutPropTypes & typeof DeprecatedShadowPropTypesIOS & typeof DeprecatedTransformPropTypes & {
  backfaceVisibility: React$PropType$Primitive<"visible" | "hidden">;
  backgroundColor: typeof DeprecatedColorPropType;
  borderColor: typeof DeprecatedColorPropType;
  borderTopColor: typeof DeprecatedColorPropType;
  borderRightColor: typeof DeprecatedColorPropType;
  borderBottomColor: typeof DeprecatedColorPropType;
  borderLeftColor: typeof DeprecatedColorPropType;
  borderStartColor: typeof DeprecatedColorPropType;
  borderEndColor: typeof DeprecatedColorPropType;
  borderRadius: typeof ReactPropTypes.number;
  borderTopLeftRadius: typeof ReactPropTypes.number;
  borderTopRightRadius: typeof ReactPropTypes.number;
  borderTopStartRadius: typeof ReactPropTypes.number;
  borderTopEndRadius: typeof ReactPropTypes.number;
  borderBottomLeftRadius: typeof ReactPropTypes.number;
  borderBottomRightRadius: typeof ReactPropTypes.number;
  borderBottomStartRadius: typeof ReactPropTypes.number;
  borderBottomEndRadius: typeof ReactPropTypes.number;
  borderStyle: React$PropType$Primitive<"solid" | "dotted" | "dashed">;
  borderWidth: typeof ReactPropTypes.number;
  borderTopWidth: typeof ReactPropTypes.number;
  borderRightWidth: typeof ReactPropTypes.number;
  borderBottomWidth: typeof ReactPropTypes.number;
  borderLeftWidth: typeof ReactPropTypes.number;
  opacity: typeof ReactPropTypes.number;

  /**
   * (Android-only) Sets the elevation of a view, using Android's underlying
   * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
   * This adds a drop shadow to the item and affects z-order for overlapping views.
   * Only supported on Android 5.0+, has no effect on earlier versions.
   * @platform android
   */
  elevation: typeof ReactPropTypes.number;
};
declare const $f2tExportDefault: typeof DeprecatedViewStylePropTypes;
export default $f2tExportDefault;