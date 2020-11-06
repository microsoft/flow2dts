declare const AnimatedValue;
declare const AnimatedValueXY;
declare const AnimatedInterpolation;
declare const Animation;
import { AnimationConfig } from "./Animation";
import { EndCallback } from "./Animation";
declare type TimingAnimationConfig = AnimationConfig & {
  toValue: number | AnimatedValue | {
    x: number;
    y: number;
  } | AnimatedValueXY | AnimatedInterpolation;
  easing?: (value: number) => number;
  duration?: number;
  delay?: number;
};
declare type TimingAnimationConfigSingle = AnimationConfig & {
  toValue: number | AnimatedValue | AnimatedInterpolation;
  easing?: (value: number) => number;
  duration?: number;
  delay?: number;
};
declare class TimingAnimation extends Animation {
  constructor: (config: TimingAnimationConfigSingle) => void;
  __getNativeAnimationConfig: () => any;
  start: (fromValue: number, onUpdate: (value: number) => void, onEnd: null | undefined | EndCallback, previousAnimation: null | undefined | Animation, animatedValue: AnimatedValue) => void;
  onUpdate: () => void;
  stop: () => void;
}
export type { TimingAnimationConfig };
export type { TimingAnimationConfigSingle };
declare const $f2tExportDefault: typeof TimingAnimation;
export default $f2tExportDefault;