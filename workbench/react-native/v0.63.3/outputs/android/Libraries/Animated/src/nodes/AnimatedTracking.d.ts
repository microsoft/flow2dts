import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $3 from "./AnimatedValue";
import $1 from "./AnimatedNode";
import { EndCallback } from "../animations/Animation";
declare class AnimatedTracking extends $1 {
  constructor(value: $TypeOf<typeof $3>, parent: $TypeOf<typeof $1>, animationClass: any, animationConfig: Object, callback?: null | undefined | EndCallback);
  __makeNative(): void;
  __getValue(): Object;
  __attach(): void;
  __detach(): void;
  update(): void;
  __getNativeConfig(): any;
}
export default AnimatedTracking;