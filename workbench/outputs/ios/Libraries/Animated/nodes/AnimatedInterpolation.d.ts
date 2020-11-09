import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedNode: $TypeOf<typeof $2>;
import $2 from "./AnimatedNode";
declare var AnimatedWithChildren: $TypeOf<typeof $3>;
import $3 from "./AnimatedWithChildren";
declare type ExtrapolateType = "extend" | "identity" | "clamp";
declare type InterpolationConfigType = {
  inputRange: ReadonlyArray<number>;
  outputRange: ReadonlyArray<number> | ReadonlyArray<string>;
  easing?: (input: number) => number;
  extrapolate?: ExtrapolateType;
  extrapolateLeft?: ExtrapolateType;
  extrapolateRight?: ExtrapolateType;
};
declare class AnimatedInterpolation extends $1 {
  __createInterpolation: (config: InterpolationConfigType) => (input: number) => number | string;
  constructor: (parent: AnimatedNode, config: InterpolationConfigType) => void;
  __makeNative: () => void;
  __getValue: () => number | string;
  interpolate: (config: InterpolationConfigType) => AnimatedInterpolation;
  __attach: () => void;
  __detach: () => void;
  __transformDataType: (range: any[]) => any[];
  __getNativeConfig: () => any;
}
declare var $1: $TypeOf<typeof AnimatedWithChildren>;
export type { InterpolationConfigType };
declare const $f2tExportDefault: $TypeOf<typeof AnimatedInterpolation>;
export default $f2tExportDefault;