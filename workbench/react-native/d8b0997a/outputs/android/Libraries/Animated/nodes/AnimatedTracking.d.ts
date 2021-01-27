import $3 from "./AnimatedValue";
import $1 from "./AnimatedNode";
import { EndCallback } from "../animations/Animation";
declare class AnimatedTracking extends $1 {
  constructor(value: typeof $3, parent: typeof $1, animationClass: any, animationConfig: Object, callback?: null | undefined | EndCallback);
  __makeNative(): void;
  __getValue(): Object;
  __attach(): void;
  __detach(): void;
  update(): void;
  __getNativeConfig(): any;
}
declare const $f2tExportDefault: AnimatedTracking;
export default $f2tExportDefault;