// @flow
declare var AnimatedInterpolation: typeof $1;
declare const $1;
declare var AnimatedNode: typeof $3;
declare const $3;
declare var AnimatedWithChildren: typeof $4;
declare const $4;
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedModulo extends $2 {
  constructor: (a: AnimatedNode, modulus: number) => void;
  __makeNative: () => void;
  __getValue: () => number;
  interpolate: (config: InterpolationConfigType) => AnimatedInterpolation;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare var $2: typeof AnimatedWithChildren;
declare const $f2tExportDefault: AnimatedModulo;
export default $f2tExportDefault;