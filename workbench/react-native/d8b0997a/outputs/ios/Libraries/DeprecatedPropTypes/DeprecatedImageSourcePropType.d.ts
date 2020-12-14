import { React$PropType$Primitive } from "flow2dts-flow-types-polyfill";
import $3 from "prop-types";
declare var ImageURISourcePropType: {
  uri: typeof PropTypes.string;
  bundle: typeof PropTypes.string;
  method: typeof PropTypes.string;
  headers: {
    [key: string]: string;
  };
  body: typeof PropTypes.string;
  cache: React$PropType$Primitive<"default" | "reload" | "force-cache" | "only-if-cached">;
  width: typeof PropTypes.number;
  height: typeof PropTypes.number;
  scale: typeof PropTypes.number;
};
declare var ImageSourcePropType: React$PropType$Primitive<typeof ImageURISourcePropType | typeof PropTypes.number | typeof ImageURISourcePropType[]>;
declare const $f2tExportDefault: typeof ImageSourcePropType;
export default $f2tExportDefault;