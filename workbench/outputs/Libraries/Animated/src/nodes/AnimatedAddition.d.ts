// @flow
declare var AnimatedInterpolation: typeof $2;
declare const $2;
declare var AnimatedNode: typeof $3;
declare const $3;
declare var AnimatedWithChildren: typeof $4;
declare const $4;
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedAddition extends $1 {
  constructor: (a: AnimatedNode | number, b: AnimatedNode | number) => void;
  __makeNative: () => void;
  __getValue: () => number;
  interpolate: (config: InterpolationConfigType) => AnimatedInterpolation;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare var $1: typeof AnimatedWithChildren;
declare const $f2tExportDefault: AnimatedAddition;
export default $f2tExportDefault;