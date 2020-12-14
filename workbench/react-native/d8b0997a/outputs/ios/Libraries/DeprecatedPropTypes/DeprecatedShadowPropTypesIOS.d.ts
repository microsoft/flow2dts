import { React$PropType$Primitive } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "prop-types";
declare var DeprecatedShadowPropTypesIOS:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  shadowColor: typeof DeprecatedColorPropType;
  shadowOffset: React$PropType$Primitive<{
    height?: number;
    width?: number;
  }>;
  shadowOpacity: typeof ReactPropTypes.number;
  shadowRadius: typeof ReactPropTypes.number;
};
declare const $f2tExportDefault: typeof DeprecatedShadowPropTypesIOS;
export default $f2tExportDefault;