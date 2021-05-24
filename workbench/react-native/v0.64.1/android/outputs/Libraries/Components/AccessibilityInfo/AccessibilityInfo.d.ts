import { $Keys } from "utility-types";
// @flow
declare type ChangeEventName = $Keys<{
  change: string;
  reduceMotionChanged: string;
  screenReaderChanged: string;
}>;
declare var AccessibilityInfo:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  /**
   * iOS only
   */
  isBoldTextEnabled: () => Promise<boolean>;

  /**
   * iOS only
   */
  isGrayscaleEnabled: () => Promise<boolean>;

  /**
   * iOS only
   */
  isInvertColorsEnabled: () => Promise<boolean>;
  isReduceMotionEnabled: () => Promise<boolean>;

  /**
   * iOS only
   */
  isReduceTransparencyEnabled: () => Promise<boolean>;
  isScreenReaderEnabled: () => Promise<boolean>;
  fetch: () => Promise<boolean>;
  addEventListener: <T>(eventName: ChangeEventName, handler: T) => void;
  removeEventListener: <T>(eventName: ChangeEventName, handler: T) => void;

  /**
   * Set accessibility focus to a react component.
   *
   * See https://reactnative.dev/docs/accessibilityinfo.html#setaccessibilityfocus
   */
  setAccessibilityFocus: (reactTag: number) => void;

  /**
   * Post a string to be announced by the screen reader.
   *
   * See https://reactnative.dev/docs/accessibilityinfo.html#announceforaccessibility
   */
  announceForAccessibility: (announcement: string) => void;
};
declare const $f2tExportDefault: typeof AccessibilityInfo;
export default $f2tExportDefault;