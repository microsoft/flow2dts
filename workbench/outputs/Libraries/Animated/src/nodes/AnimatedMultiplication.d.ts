declare const AnimatedInterpolation;
declare const AnimatedNode;
declare const AnimatedWithChildren;
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedMultiplication extends AnimatedWithChildren {
  constructor: (a: AnimatedNode | number, b: AnimatedNode | number) => void;
  __makeNative: () => void;
  __getValue: () => number;
  interpolate: (config: InterpolationConfigType) => AnimatedInterpolation;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare const $f2tExportDefault: typeof AnimatedMultiplication;
export default $f2tExportDefault;