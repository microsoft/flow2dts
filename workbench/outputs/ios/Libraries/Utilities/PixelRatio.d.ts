// @flow
declare class PixelRatio {
  get(): number;
  getFontScale(): number;
  getPixelSizeForLayoutSize(layoutSize: number): number;
  roundToNearestPixel(layoutSize: number): number;
  startDetecting(): void;
}
export default PixelRatio;