/**
 * TODO: Figure out why these are not included in the Flow dump
 */
declare var ToastAndroid: {
  // Toast duration constants
  SHORT: number;
  LONG: number;
  // Toast gravity constants
  TOP: number;
  BOTTOM: number;
  CENTER: number;
  show: (message: string, duration: number) => void;
  showWithGravity: (message: string, duration: number, gravity: number) => void;
  showWithGravityAndOffset: (message: string, duration: number, gravity: number, xOffset: number, yOffset: number) => void;
};
declare const $f2tExportDefault: typeof ToastAndroid;
export default $f2tExportDefault;