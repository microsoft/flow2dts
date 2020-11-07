import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedInterpolation: $TypeOf<typeof $1>;
declare const $1;
declare var AnimatedNode: $TypeOf<typeof $3>;
declare const $3;
declare var AnimatedWithChildren: $TypeOf<typeof $4>;
declare const $4;
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedMultiplication extends $2 {
  constructor: (a: AnimatedNode | number, b: AnimatedNode | number) => void;
  __makeNative: () => void;
  __getValue: () => number;
  interpolate: (config: InterpolationConfigType) => AnimatedInterpolation;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare var $2: $TypeOf<typeof AnimatedWithChildren>;
declare const $f2tExportDefault: $TypeOf<typeof AnimatedMultiplication>;
export default $f2tExportDefault;