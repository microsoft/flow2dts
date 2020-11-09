import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { NativeText } from "./TextNativeComponent";
import { NativeVirtualText } from "./TextNativeComponent";
declare var DeprecatedTextPropTypes: $TypeOf<typeof $1>;
import $1 from "../DeprecatedPropTypes/DeprecatedTextPropTypes";
declare var React: $TypeOf<typeof $2>;
import $2 from "react";
import { TextProps } from "./TextProps";
declare var Text: React.AbstractComponent<TextProps, React.ElementRef<$TypeOf<typeof NativeText> | $TypeOf<typeof NativeVirtualText>>>;
declare var TextToExport: $TypeOf<typeof Text> & Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  propTypes: $TypeOf<typeof DeprecatedTextPropTypes>;
}>;
declare const $f2tExportDefault: $TypeOf<typeof TextToExport>;
export default $f2tExportDefault;