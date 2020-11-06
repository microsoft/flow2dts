declare const AnimatedValue;
declare const AnimatedNode;
import { EndCallback } from "../animations/Animation";
declare class AnimatedTracking extends AnimatedNode {
  constructor: (value: AnimatedValue, parent: AnimatedNode, animationClass: any, animationConfig: Object, callback?: null | undefined | EndCallback) => void;
  __makeNative: () => void;
  __getValue: () => Object;
  __attach: () => void;
  __detach: () => void;
  update: () => void;
  __getNativeConfig: () => any;
}
declare const $f2tExportDefault: typeof AnimatedTracking;
export default $f2tExportDefault;