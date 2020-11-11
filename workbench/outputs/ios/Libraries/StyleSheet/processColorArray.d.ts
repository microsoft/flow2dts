import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import type { ColorValue } from "./StyleSheet";
import type { ProcessedColorValue } from "./processColor";
declare function processColorArray(colors: null | undefined | ColorValue[]): null | undefined | (null | undefined | ProcessedColorValue)[];
declare const $f2tExportDefault: $TypeOf<typeof processColorArray>;
export default $f2tExportDefault;