import { $TypeOf, React$PropType$Primitive } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "prop-types";
declare var DeprecatedShadowPropTypesIOS:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  shadowColor: $TypeOf<typeof $1>;
  shadowOffset: React$PropType$Primitive<{
    height?: number;
    width?: number;
  }>;
  shadowOpacity: $TypeOf<typeof $2.number>;
  shadowRadius: $TypeOf<typeof $2.number>;
};
declare const $f2tExportDefault: $TypeOf<typeof DeprecatedShadowPropTypesIOS>;
export default $f2tExportDefault;