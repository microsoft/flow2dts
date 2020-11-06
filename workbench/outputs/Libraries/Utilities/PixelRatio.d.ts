// @flow
declare class PixelRatio {
  get: () => number;
  getFontScale: () => number;
  getPixelSizeForLayoutSize: (layoutSize: number) => number;
  roundToNearestPixel: (layoutSize: number) => number;
  startDetecting: () => void;
}
declare const $f2tExportDefault: PixelRatio;
export default $f2tExportDefault;