/*[FLOW2DTS - Warning] This type alias was opaque in the original Flow source.*/
declare type NativeColorType = {};
declare type ProcessedColorValue = (null | undefined | number) | NativeColorType;
declare function processColor(color?: null | undefined | (string | number)) => ProcessedColorValue;
export type { ProcessedColorValue };
declare const $f2tExportDefault: typeof processColor;
export default $f2tExportDefault;