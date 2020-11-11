import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import type { ColorValue } from "./StyleSheet";
import type { NativeColorValue } from "./PlatformColorValueTypes";
declare type ProcessedColorValue = number | NativeColorValue;
declare function processColor(color?: null | undefined | (number | ColorValue)): null | undefined | ProcessedColorValue;
export type { ProcessedColorValue };
declare const $f2tExportDefault: $TypeOf<typeof processColor>;
export default $f2tExportDefault;