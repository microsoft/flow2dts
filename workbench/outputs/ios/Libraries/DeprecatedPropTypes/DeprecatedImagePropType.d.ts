import $1 from "./DeprecatedEdgeInsetsPropType";
import $2 from "./DeprecatedImageSourcePropType";
import $3 from "prop-types";
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  style: ReactPropsCheckType;
  source: $2;
  defaultSource: React$PropType$Primitive<{
    height?: number;
    scale?: number;
    uri?: string;
    width?: number;
  } | number>;
  accessible: $3.bool;
  accessibilityLabel: $3.node;
  blurRadius: $3.number;
  capInsets: $1;
  resizeMethod: React$PropType$Primitive<"auto" | "resize" | "scale">;
  resizeMode: React$PropType$Primitive<"cover" | "contain" | "stretch" | "repeat" | "center">;
  testID: $3.string;
  onLayout: $3.func;
  onLoadStart: $3.func;
  onProgress: $3.func;
  onError: $3.func;
  onPartialLoad: $3.func;
  onLoad: $3.func;
  onLoadEnd: $3.func;
};
export default $f2tExportDefault;