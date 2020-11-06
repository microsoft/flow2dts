declare const AnimatedInterpolation;
declare const AnimatedNode;
declare const AnimatedWithChildren;
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedDiffClamp extends AnimatedWithChildren {
  constructor: (a: AnimatedNode, min: number, max: number) => void;
  __makeNative: () => void;
  interpolate: (config: InterpolationConfigType) => AnimatedInterpolation;
  __getValue: () => number;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare const $f2tExportDefault: typeof AnimatedDiffClamp;
export default $f2tExportDefault;