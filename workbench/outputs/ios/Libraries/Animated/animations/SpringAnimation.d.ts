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
declare type SpringAnimationConfig = AnimationConfig & {
  toValue: number | AnimatedValue | {
    x: number;
    y: number;
  } | AnimatedValueXY | AnimatedInterpolation;
  overshootClamping?: boolean;
  restDisplacementThreshold?: number;
  restSpeedThreshold?: number;
  velocity?: number | {
    x: number;
    y: number;
  };
  bounciness?: number;
  speed?: number;
  tension?: number;
  friction?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  delay?: number;
};
declare type SpringAnimationConfigSingle = AnimationConfig & {
  toValue: number | AnimatedValue | AnimatedInterpolation;
  overshootClamping?: boolean;
  restDisplacementThreshold?: number;
  restSpeedThreshold?: number;
  velocity?: number;
  bounciness?: number;
  speed?: number;
  tension?: number;
  friction?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  delay?: number;
};
declare class SpringAnimation extends $5 {
  constructor: (config: SpringAnimationConfigSingle) => void;
  __getNativeAnimationConfig: () =>
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    damping: number;
    initialVelocity: number;
    iterations: number;
    mass: number;
    overshootClamping: boolean;
    restDisplacementThreshold: number;
    restSpeedThreshold: number;
    stiffness: number;
    toValue: any;
    type: string;
  };
  start: (fromValue: number, onUpdate: (value: number) => void, onEnd: null | undefined | EndCallback, previousAnimation: null | undefined | Animation, animatedValue: AnimatedValue) => void;
  getInternalState: () => Object;

  /**
   * This spring model is based off of a damped harmonic oscillator
   * (https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator).
   *
   * We use the closed form of the second order differential equation:
   *
   * x'' + (2ζ⍵_0)x' + ⍵^2x = 0
   *
   * where
   *    ⍵_0 = √(k / m) (undamped angular frequency of the oscillator),
   *    ζ = c / 2√mk (damping ratio),
   *    c = damping constant
   *    k = stiffness
   *    m = mass
   *
   * The derivation of the closed form is described in detail here:
   * http://planetmath.org/sites/default/files/texpdf/39745.pdf
   *
   * This algorithm happens to match the algorithm used by CASpringAnimation,
   * a QuartzCore (iOS) API that creates spring animations.
   */
  onUpdate: () => void;
  stop: () => void;
}
declare var $5: $TypeOf<typeof Animation>;
export type { SpringAnimationConfig };
export type { SpringAnimationConfigSingle };
declare const $f2tExportDefault: $TypeOf<typeof SpringAnimation>;
export default $f2tExportDefault;