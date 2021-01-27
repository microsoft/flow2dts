// @flow
declare class PixelRatio {
  static get(): number;
  static getFontScale(): number;
  static getPixelSizeForLayoutSize(layoutSize: number): number;
  static roundToNearestPixel(layoutSize: number): number;
  static startDetecting(): void;
}
declare const $f2tExportDefault: PixelRatio;
export default $f2tExportDefault;