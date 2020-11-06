// @flow
declare var AnimatedInterpolation: typeof $2;
declare const $2;
declare var AnimatedNode: typeof $3;
declare const $3;
declare var AnimatedWithChildren: typeof $4;
declare const $4;
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedDiffClamp extends $1 {
  constructor: (a: AnimatedNode, min: number, max: number) => void;
  __makeNative: () => void;
  interpolate: (config: InterpolationConfigType) => AnimatedInterpolation;
  __getValue: () => number;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare var $1: typeof AnimatedWithChildren;
declare const $f2tExportDefault: AnimatedDiffClamp;
export default $f2tExportDefault;