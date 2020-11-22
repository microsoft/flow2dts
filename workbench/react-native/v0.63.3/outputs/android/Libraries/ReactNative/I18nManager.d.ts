import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var i18nConstants:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  doLeftAndRightSwapInRTL: boolean;
  isRTL: boolean;
};
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  getConstants: () =>
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    doLeftAndRightSwapInRTL: boolean;
    isRTL: boolean;
  };
  allowRTL: (shouldAllow: boolean) => void;
  forceRTL: (shouldForce: boolean) => void;
  swapLeftAndRightInRTL: (flipStyles: boolean) => void;
  isRTL: $TypeOf<typeof i18nConstants.isRTL>;
  doLeftAndRightSwapInRTL: $TypeOf<typeof i18nConstants.doLeftAndRightSwapInRTL>;
};
export default $f2tExportDefault;