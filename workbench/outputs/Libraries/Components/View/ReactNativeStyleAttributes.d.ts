declare const DeprecatedImageStylePropTypes;
declare const DeprecatedTextStylePropTypes;
declare const DeprecatedViewStylePropTypes;
declare const processColor;
declare const processTransform;
declare const sizesDiffer;
declare type ReturnBoolType = <V>($f2t1: V) => true;
declare type BoolifiedDeprecatedViewStylePropTypes = $ObjMap;
declare type BoolifiedDeprecatedTextStylePropTypes = $ObjMapi;
declare type BoolifiedDeprecatedImageStylePropTypes = $ObjMapi;
declare type StyleAttributesType = BoolifiedDeprecatedViewStylePropTypes & BoolifiedDeprecatedTextStylePropTypes & BoolifiedDeprecatedImageStylePropTypes & {
  transform: Readonly<
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    process: typeof processTransform;
  }> | true;
  shadowOffset: Readonly<
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    diff: typeof sizesDiffer;
  }> | true;
  backgroundColor: typeof colorAttributes | true;
  borderBottomColor: typeof colorAttributes | true;
  borderColor: typeof colorAttributes | true;
  borderLeftColor: typeof colorAttributes | true;
  borderRightColor: typeof colorAttributes | true;
  borderTopColor: typeof colorAttributes | true;
  borderStartColor: typeof colorAttributes | true;
  borderEndColor: typeof colorAttributes | true;
  color: typeof colorAttributes | true;
  shadowColor: typeof colorAttributes | true;
  textDecorationColor: typeof colorAttributes | true;
  tintColor: typeof colorAttributes | true;
  textShadowColor: typeof colorAttributes | true;
  overlayColor: typeof colorAttributes | true;
};
declare var ReactNativeStyleAttributes: StyleAttributesType;
declare var colorAttributes:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  process: typeof processColor;
};
declare const $f2tExportDefault: typeof ReactNativeStyleAttributes;
export default $f2tExportDefault;