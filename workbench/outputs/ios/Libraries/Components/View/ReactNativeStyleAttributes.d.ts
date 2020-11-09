import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var DeprecatedImageStylePropTypes: $TypeOf<typeof $1>;
import $1 from "../../DeprecatedPropTypes/DeprecatedImageStylePropTypes";
declare var DeprecatedTextStylePropTypes: $TypeOf<typeof $2>;
import $2 from "../../DeprecatedPropTypes/DeprecatedTextStylePropTypes";
declare var DeprecatedViewStylePropTypes: $TypeOf<typeof $3>;
import $3 from "../../DeprecatedPropTypes/DeprecatedViewStylePropTypes";
declare var processColor: $TypeOf<typeof $4>;
import $4 from "../../StyleSheet/processColor";
declare var processTransform: $TypeOf<typeof $5>;
import $5 from "../../StyleSheet/processTransform";
declare var sizesDiffer: $TypeOf<typeof $6>;
import $6 from "../../Utilities/differ/sizesDiffer";
declare type ReturnBoolType = <V>($f2t1: V) => true;
declare type BoolifiedDeprecatedViewStylePropTypes = $ObjMap<$TypeOf<typeof DeprecatedViewStylePropTypes>, ReturnBoolType>;
declare type BoolifiedDeprecatedTextStylePropTypes = $ObjMapi<$TypeOf<typeof DeprecatedTextStylePropTypes>, ReturnBoolType>;
declare type BoolifiedDeprecatedImageStylePropTypes = $ObjMapi<$TypeOf<typeof DeprecatedImageStylePropTypes>, ReturnBoolType>;
declare type StyleAttributesType = BoolifiedDeprecatedViewStylePropTypes & BoolifiedDeprecatedTextStylePropTypes & BoolifiedDeprecatedImageStylePropTypes & {
  transform: Readonly<
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    process: $TypeOf<typeof processTransform>;
  }> | true;
  shadowOffset: Readonly<
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    diff: $TypeOf<typeof sizesDiffer>;
  }> | true;
  backgroundColor: $TypeOf<typeof colorAttributes> | true;
  borderBottomColor: $TypeOf<typeof colorAttributes> | true;
  borderColor: $TypeOf<typeof colorAttributes> | true;
  borderLeftColor: $TypeOf<typeof colorAttributes> | true;
  borderRightColor: $TypeOf<typeof colorAttributes> | true;
  borderTopColor: $TypeOf<typeof colorAttributes> | true;
  borderStartColor: $TypeOf<typeof colorAttributes> | true;
  borderEndColor: $TypeOf<typeof colorAttributes> | true;
  color: $TypeOf<typeof colorAttributes> | true;
  shadowColor: $TypeOf<typeof colorAttributes> | true;
  textDecorationColor: $TypeOf<typeof colorAttributes> | true;
  tintColor: $TypeOf<typeof colorAttributes> | true;
  textShadowColor: $TypeOf<typeof colorAttributes> | true;
  overlayColor: $TypeOf<typeof colorAttributes> | true;
};
declare var ReactNativeStyleAttributes: StyleAttributesType;
declare var colorAttributes:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  process: $TypeOf<typeof processColor>;
};
declare const $f2tExportDefault: $TypeOf<typeof ReactNativeStyleAttributes>;
export default $f2tExportDefault;