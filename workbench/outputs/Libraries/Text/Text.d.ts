import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var DeprecatedTextPropTypes: $TypeOf<typeof $1>;
import $1 from "../DeprecatedPropTypes/DeprecatedTextPropTypes";
declare var React: $TypeOf<typeof $2>;
import $2 from "react";
import { HostComponent } from "../Renderer/shims/ReactNativeTypes";
import { TextProps } from "./TextProps";
declare type TextStatics = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  propTypes: $TypeOf<typeof DeprecatedTextPropTypes>;
}>;
declare const $f2tExportDefault: React.AbstractComponent<TextProps, React.ElementRef<HostComponent>> & TextStatics;
export default $f2tExportDefault;