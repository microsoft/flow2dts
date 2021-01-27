import $2 from "./AnimatedInterpolation";
import $3 from "./AnimatedNode";
import $4 from "./AnimatedWithChildren";
import { InterpolationConfigType } from "./AnimatedInterpolation";
declare class AnimatedAddition extends $4 {
  constructor(a: typeof $3 | number, b: typeof $3 | number);
  __makeNative(): void;
  __getValue(): number;
  interpolate(config: InterpolationConfigType): typeof $2;
  __attach(): void;
  __detach(): void;
  __getNativeConfig(): any;
}
declare const $f2tExportDefault: AnimatedAddition;
export default $f2tExportDefault;