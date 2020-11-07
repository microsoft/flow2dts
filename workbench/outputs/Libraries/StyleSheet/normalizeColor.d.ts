import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { ColorValue } from "./StyleSheet";
import { ProcessedColorValue } from "./processColor";
declare function normalizeColor(color: null | undefined | (ColorValue | ProcessedColorValue)) => null | undefined | ProcessedColorValue;
declare const $f2tExportDefault: $TypeOf<typeof normalizeColor>;
export default $f2tExportDefault;