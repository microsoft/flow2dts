// @flow
import { ColorValue } from "./StyleSheetTypes";
declare type ProcessedColorValue = number;
declare function processColor(color?: null | undefined | (number | ColorValue)): null | undefined | ProcessedColorValue;
export type { ProcessedColorValue };
declare const $f2tExportDefault: typeof processColor;
export default $f2tExportDefault;