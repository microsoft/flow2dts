// @flow
import { ColorValue } from "./StyleSheet";
import { ProcessedColorValue } from "./processColor";

/*[FLOW2DTS - Warning] This type alias was opaque in the original Flow source.*/
declare type NativeColorValue = {
  resource_paths?: string[];
};
declare var PlatformColor: (...names: string[]) => ColorValue;
declare var normalizeColorObject: (color: NativeColorValue) => null | undefined | ProcessedColorValue;
declare var processColorObject: (color: NativeColorValue) => null | undefined | NativeColorValue;
export type { NativeColorValue };
export { PlatformColor };
export { normalizeColorObject };
export { processColorObject };