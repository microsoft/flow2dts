import { $TypeOf, React$PropType$Primitive } from "flow2dts-flow-types-polyfill";
import $3 from "prop-types";
declare var ImageURISourcePropType: {
  uri: $TypeOf<typeof $3.string>;
  bundle: $TypeOf<typeof $3.string>;
  method: $TypeOf<typeof $3.string>;
  headers: {
    [key: string]: string;
  };
  body: $TypeOf<typeof $3.string>;
  cache: React$PropType$Primitive<"default" | "reload" | "force-cache" | "only-if-cached">;
  width: $TypeOf<typeof $3.number>;
  height: $TypeOf<typeof $3.number>;
  scale: $TypeOf<typeof $3.number>;
};
declare var ImageSourcePropType: React$PropType$Primitive<typeof ImageURISourcePropType | $TypeOf<typeof $3.number> | typeof ImageURISourcePropType[]>;
declare const $f2tExportDefault: typeof ImageSourcePropType;
export default $f2tExportDefault;