import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedValue: $TypeOf<typeof $2>;
declare const $2;
declare var AnimatedValueXY: $TypeOf<typeof $3>;
declare const $3;
declare var AnimatedInterpolation: $TypeOf<typeof $1>;
declare const $1;
declare var Animation: $TypeOf<typeof $4>;
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
declare var $5: $TypeOf<typeof Animation>;
export type { TimingAnimationConfig };
export type { TimingAnimationConfigSingle };
declare const $f2tExportDefault: $TypeOf<typeof TimingAnimation>;
export default $f2tExportDefault;