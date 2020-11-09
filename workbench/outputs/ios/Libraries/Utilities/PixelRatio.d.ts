import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare class PixelRatio {
  get: () => number;
  getFontScale: () => number;
  getPixelSizeForLayoutSize: (layoutSize: number) => number;
  roundToNearestPixel: (layoutSize: number) => number;
  startDetecting: () => void;
}
declare const $f2tExportDefault: $TypeOf<typeof PixelRatio>;
export default $f2tExportDefault;