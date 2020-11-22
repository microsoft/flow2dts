import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./AnimatedInterpolation";
import $3 from "./AnimatedNode";
import $4 from "./AnimatedWithChildren";
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedModulo extends $4 {
  constructor(a: $TypeOf<typeof $3>, modulus: number);
  __makeNative(): void;
  __getValue(): number;
  interpolate(config: InterpolationConfigType): $TypeOf<typeof $1>;
  __attach(): void;
  __detach(): void;
  __getNativeConfig(): any;
}
export default AnimatedModulo;