// @flow
declare var AnimatedValue: typeof $2;
declare const $2;
declare var AnimatedValueXY: typeof $3;
declare const $3;
declare var AnimatedInterpolation: typeof $1;
declare const $1;
declare var Animation: typeof $4;
declare const $4;
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
declare class TimingAnimation extends $5 {
  constructor: (config: TimingAnimationConfigSingle) => void;
  __getNativeAnimationConfig: () => any;
  start: (fromValue: number, onUpdate: (value: number) => void, onEnd: null | undefined | EndCallback, previousAnimation: null | undefined | Animation, animatedValue: AnimatedValue) => void;
  onUpdate: () => void;
  stop: () => void;
}
declare var $5: typeof Animation;
export type { TimingAnimationConfig };
export type { TimingAnimationConfigSingle };
declare const $f2tExportDefault: typeof TimingAnimation;
export default $f2tExportDefault;