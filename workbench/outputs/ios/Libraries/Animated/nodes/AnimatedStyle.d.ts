import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedWithChildren: $TypeOf<typeof $2>;
import $2 from "./AnimatedWithChildren";
declare class AnimatedStyle extends $1 {
  constructor: (style: any) => void;
  __getValue: () => Object;
  __getAnimatedValue: () => Object;
  __attach: () => void;
  __detach: () => void;
  __makeNative: () => void;
  __getNativeConfig: () => Object;
}
declare var $1: $TypeOf<typeof AnimatedWithChildren>;
declare const $f2tExportDefault: $TypeOf<typeof AnimatedStyle>;
export default $f2tExportDefault;