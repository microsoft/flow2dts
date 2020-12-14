import { React$PropType$Primitive, ReactPropsCheckType } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedEdgeInsetsPropType";
import $2 from "./DeprecatedImageSourcePropType";
import $3 from "prop-types";
declare const $f2t_style: ReactPropsCheckType;
declare const $f2t_source: typeof DeprecatedImageSourcePropType;
declare const $f2t_defaultSource: React$PropType$Primitive<{
  height?: number;
  scale?: number;
  uri?: string;
  width?: number;
} | number>;
declare const $f2t_accessible: typeof PropTypes.bool;
declare const $f2t_accessibilityLabel: typeof PropTypes.node;
declare const $f2t_blurRadius: typeof PropTypes.number;
declare const $f2t_capInsets: typeof DeprecatedEdgeInsetsPropType;
declare const $f2t_resizeMethod: React$PropType$Primitive<"auto" | "resize" | "scale">;
declare const $f2t_resizeMode: React$PropType$Primitive<"cover" | "contain" | "stretch" | "repeat" | "center">;
declare const $f2t_testID: typeof PropTypes.string;
declare const $f2t_onLayout: typeof PropTypes.func;
declare const $f2t_onLoadStart: typeof PropTypes.func;
declare const $f2t_onProgress: typeof PropTypes.func;
declare const $f2t_onError: typeof PropTypes.func;
declare const $f2t_onPartialLoad: typeof PropTypes.func;
declare const $f2t_onLoad: typeof PropTypes.func;
declare const $f2t_onLoadEnd: typeof PropTypes.func;
export { $f2t_style as style, $f2t_source as source, $f2t_defaultSource as defaultSource, $f2t_accessible as accessible, $f2t_accessibilityLabel as accessibilityLabel, $f2t_blurRadius as blurRadius, $f2t_capInsets as capInsets, $f2t_resizeMethod as resizeMethod, $f2t_resizeMode as resizeMode, $f2t_testID as testID, $f2t_onLayout as onLayout, $f2t_onLoadStart as onLoadStart, $f2t_onProgress as onProgress, $f2t_onError as onError, $f2t_onPartialLoad as onPartialLoad, $f2t_onLoad as onLoad, $f2t_onLoadEnd as onLoadEnd };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  style: ReactPropsCheckType;
  source: typeof DeprecatedImageSourcePropType;
  defaultSource: React$PropType$Primitive<{
    height?: number;
    scale?: number;
    uri?: string;
    width?: number;
  } | number>;
  accessible: typeof PropTypes.bool;
  accessibilityLabel: typeof PropTypes.node;
  blurRadius: typeof PropTypes.number;
  capInsets: typeof DeprecatedEdgeInsetsPropType;
  resizeMethod: React$PropType$Primitive<"auto" | "resize" | "scale">;
  resizeMode: React$PropType$Primitive<"cover" | "contain" | "stretch" | "repeat" | "center">;
  testID: typeof PropTypes.string;
  onLayout: typeof PropTypes.func;
  onLoadStart: typeof PropTypes.func;
  onProgress: typeof PropTypes.func;
  onError: typeof PropTypes.func;
  onPartialLoad: typeof PropTypes.func;
  onLoad: typeof PropTypes.func;
  onLoadEnd: typeof PropTypes.func;
};
export default $f2tExportDefault;