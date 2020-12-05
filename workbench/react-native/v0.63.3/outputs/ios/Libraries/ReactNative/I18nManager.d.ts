import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var i18nConstants:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  doLeftAndRightSwapInRTL: boolean;
  isRTL: boolean;
};
declare const $f2t_getConstants: () =>
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  doLeftAndRightSwapInRTL: boolean;
  isRTL: boolean;
};
declare const $f2t_allowRTL: (shouldAllow: boolean) => void;
declare const $f2t_forceRTL: (shouldForce: boolean) => void;
declare const $f2t_swapLeftAndRightInRTL: (flipStyles: boolean) => void;
declare const $f2t_isRTL: $TypeOf<typeof i18nConstants.isRTL>;
declare const $f2t_doLeftAndRightSwapInRTL: $TypeOf<typeof i18nConstants.doLeftAndRightSwapInRTL>;
export { $f2t_getConstants as getConstants, $f2t_allowRTL as allowRTL, $f2t_forceRTL as forceRTL, $f2t_swapLeftAndRightInRTL as swapLeftAndRightInRTL, $f2t_isRTL as isRTL, $f2t_doLeftAndRightSwapInRTL as doLeftAndRightSwapInRTL };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  getConstants: () => {
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