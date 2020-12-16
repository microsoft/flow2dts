import { $TypeOf, React$PropType$Primitive, ReactPropsCheckType } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedEdgeInsetsPropType";
import $2 from "./DeprecatedImageSourcePropType";
import $3 from "prop-types";
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