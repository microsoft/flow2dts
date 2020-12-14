import { $TypeOf, React$PropType$Primitive, ReactPropsCheckType } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedEdgeInsetsPropType";
import $2 from "./DeprecatedImageSourcePropType";
import $3 from "prop-types";
declare const $f2t_style: ReactPropsCheckType;
declare const $f2t_source: $TypeOf<typeof $2>;
declare const $f2t_defaultSource: React$PropType$Primitive<{
  height?: number;
  scale?: number;
  uri?: string;
  width?: number;
} | number>;
declare const $f2t_accessible: typeof $3.bool;
declare const $f2t_accessibilityLabel: typeof $3.node;
declare const $f2t_blurRadius: typeof $3.number;
declare const $f2t_capInsets: $TypeOf<typeof $1>;
declare const $f2t_resizeMethod: React$PropType$Primitive<"auto" | "resize" | "scale">;
declare const $f2t_resizeMode: React$PropType$Primitive<"cover" | "contain" | "stretch" | "repeat" | "center">;
declare const $f2t_testID: typeof $3.string;
declare const $f2t_onLayout: typeof $3.func;
declare const $f2t_onLoadStart: typeof $3.func;
declare const $f2t_onProgress: typeof $3.func;
declare const $f2t_onError: typeof $3.func;
declare const $f2t_onPartialLoad: typeof $3.func;
declare const $f2t_onLoad: typeof $3.func;
declare const $f2t_onLoadEnd: typeof $3.func;
export { $f2t_style as style, $f2t_source as source, $f2t_defaultSource as defaultSource, $f2t_accessible as accessible, $f2t_accessibilityLabel as accessibilityLabel, $f2t_blurRadius as blurRadius, $f2t_capInsets as capInsets, $f2t_resizeMethod as resizeMethod, $f2t_resizeMode as resizeMode, $f2t_testID as testID, $f2t_onLayout as onLayout, $f2t_onLoadStart as onLoadStart, $f2t_onProgress as onProgress, $f2t_onError as onError, $f2t_onPartialLoad as onPartialLoad, $f2t_onLoad as onLoad, $f2t_onLoadEnd as onLoadEnd };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  style: ReactPropsCheckType;
  source: $TypeOf<typeof $2>;
  defaultSource: React$PropType$Primitive<{
    height?: number;
    scale?: number;
    uri?: string;
    width?: number;
  } | number>;
  accessible: typeof $3.bool;
  accessibilityLabel: typeof $3.node;
  blurRadius: typeof $3.number;
  capInsets: $TypeOf<typeof $1>;
  resizeMethod: React$PropType$Primitive<"auto" | "resize" | "scale">;
  resizeMode: React$PropType$Primitive<"cover" | "contain" | "stretch" | "repeat" | "center">;
  testID: typeof $3.string;
  onLayout: typeof $3.func;
  onLoadStart: typeof $3.func;
  onProgress: typeof $3.func;
  onError: typeof $3.func;
  onPartialLoad: typeof $3.func;
  onLoad: typeof $3.func;
  onLoadEnd: typeof $3.func;
};
export default $f2tExportDefault;