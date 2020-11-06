// @flow
declare var AnimatedNode: typeof $2;
declare const $2;
declare var AnimatedWithChildren: typeof $3;
declare const $3;
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
declare var $1: typeof AnimatedWithChildren;
export type { InterpolationConfigType };
declare const $f2tExportDefault: AnimatedInterpolation;
export default $f2tExportDefault;