import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedInterpolation: $TypeOf<typeof $1>;
import $1 from "./AnimatedInterpolation";
declare var AnimatedNode: $TypeOf<typeof $2>;
import $2 from "./AnimatedNode";
declare var AnimatedWithChildren: $TypeOf<typeof $4>;
import $4 from "./AnimatedWithChildren";
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedSubtraction extends $3 {
  constructor: (a: AnimatedNode | number, b: AnimatedNode | number) => void;
  __makeNative: () => void;
  __getValue: () => number;
  interpolate: (config: InterpolationConfigType) => AnimatedInterpolation;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare var $3: $TypeOf<typeof AnimatedWithChildren>;
declare const $f2tExportDefault: $TypeOf<typeof AnimatedSubtraction>;
export default $f2tExportDefault;