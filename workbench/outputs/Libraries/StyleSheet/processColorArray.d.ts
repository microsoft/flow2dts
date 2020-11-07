import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { ColorValue } from "./StyleSheetTypes";
import { ProcessedColorValue } from "./processColor";
declare function processColorArray(colors: null | undefined | ColorValue[]) => null | undefined | (null | undefined | ProcessedColorValue)[];
declare const $f2tExportDefault: $TypeOf<typeof processColorArray>;
export default $f2tExportDefault;