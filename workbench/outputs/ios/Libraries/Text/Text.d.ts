import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { NativeText } from "./TextNativeComponent";
import { NativeVirtualText } from "./TextNativeComponent";
import $1 from "../DeprecatedPropTypes/DeprecatedTextPropTypes";
import $2 from "react";
import { TextProps } from "./TextProps";
declare var Text: $2<TextProps, $2<$TypeOf<typeof NativeText> | $TypeOf<typeof NativeVirtualText>>>;
declare var TextToExport: $TypeOf<typeof Text> & Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  propTypes: $1;
}>;
declare const $f2tExportDefault: $TypeOf<typeof TextToExport>;
export default $f2tExportDefault;