declare const AnimatedNode;
declare const AnimatedWithChildren;
declare type ExtrapolateType = "extend" | "identity" | "clamp";
declare type InterpolationConfigType = {
  inputRange: ReadonlyArray<number>;

  /* $FlowFixMe(>=0.38.0 site=react_native_fb,react_native_oss) - Flow error
     * detected during the deployment of v0.38.0. To see the error, remove this
     * comment and run flow
     */
  outputRange: ReadonlyArray<number> | ReadonlyArray<string>;
  easing?: (input: number) => number;
  extrapolate?: ExtrapolateType;
  extrapolateLeft?: ExtrapolateType;
  extrapolateRight?: ExtrapolateType;
};
declare class AnimatedInterpolation extends AnimatedWithChildren {
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
export type { InterpolationConfigType };
declare const $f2tExportDefault: typeof AnimatedInterpolation;
export default $f2tExportDefault;