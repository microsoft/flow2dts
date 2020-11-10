import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $2 from "./AnimatedInterpolation";
import $3 from "./AnimatedNode";
import $4 from "./AnimatedWithChildren";
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedDiffClamp extends $4 {
  constructor: (a: $3, min: number, max: number) => void;
  __makeNative: () => void;
  interpolate: (config: InterpolationConfigType) => $2;
  __getValue: () => number;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare const $f2tExportDefault: $TypeOf<typeof AnimatedDiffClamp>;
export default $f2tExportDefault;