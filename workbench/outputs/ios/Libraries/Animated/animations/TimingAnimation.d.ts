import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedValue: $TypeOf<typeof $2>;
import $2 from "../nodes/AnimatedValue";
declare var AnimatedValueXY: $TypeOf<typeof $3>;
import $3 from "../nodes/AnimatedValueXY";
declare var AnimatedInterpolation: $TypeOf<typeof $1>;
import $1 from "../nodes/AnimatedInterpolation";
declare var Animation: $TypeOf<typeof $4>;
import $4 from "./Animation";
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