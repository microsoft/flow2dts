// @flow
declare var AnimatedInterpolation: typeof $1;
declare const $1;
declare var AnimatedNode: typeof $2;
declare const $2;
declare var AnimatedWithChildren: typeof $4;
declare const $4;
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedSubtraction extends $3 {
  constructor: (a: AnimatedNode | number, b: AnimatedNode | number) => void;
  __makeNative: () => void;
  __getValue: () => number;
  interpolate: (config: InterpolationConfigType) => AnimatedInterpolation;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare var $3: typeof AnimatedWithChildren;
declare const $f2tExportDefault: AnimatedSubtraction;
export default $f2tExportDefault;