import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "../../DeprecatedPropTypes/DeprecatedImageStylePropTypes";
import $2 from "../../DeprecatedPropTypes/DeprecatedTextStylePropTypes";
import $3 from "../../DeprecatedPropTypes/DeprecatedViewStylePropTypes";
import $4 from "../../StyleSheet/processColor";
import $5 from "../../StyleSheet/processTransform";
import $6 from "../../Utilities/differ/sizesDiffer";
declare type ReturnBoolType = <V>($f2t1: V) => true;
declare type BoolifiedDeprecatedViewStylePropTypes =
/*[FLOW2DTS - Warning] This type was a $ObjMap type in the original Flow source.*/
{ [K in keyof $TypeOf<typeof $3>]: ReturnType<ReturnBoolType> };
declare type BoolifiedDeprecatedTextStylePropTypes = $ObjMapi<$TypeOf<typeof $2>, ReturnBoolType>;
declare type BoolifiedDeprecatedImageStylePropTypes = $ObjMapi<$TypeOf<typeof $1>, ReturnBoolType>;
declare type StyleAttributesType = BoolifiedDeprecatedViewStylePropTypes & BoolifiedDeprecatedTextStylePropTypes & BoolifiedDeprecatedImageStylePropTypes & {
  transform: Readonly<
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    process: $TypeOf<typeof $5>;
  }> | true;
  shadowOffset: Readonly<
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    diff: $TypeOf<typeof $6>;
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
  process: $TypeOf<typeof $4>;
};
declare const $f2tExportDefault: $TypeOf<typeof ReactNativeStyleAttributes>;
export default $f2tExportDefault;