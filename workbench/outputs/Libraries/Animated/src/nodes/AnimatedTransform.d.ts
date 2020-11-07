import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedWithChildren: $TypeOf<typeof $2>;
declare const $2;
declare class AnimatedTransform extends $1 {
  constructor: (transforms: ReadonlyArray<Object>) => void;
  __makeNative: () => void;
  __getValue: () => ReadonlyArray<Object>;
  __getAnimatedValue: () => ReadonlyArray<Object>;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare var $1: $TypeOf<typeof AnimatedWithChildren>;
declare const $f2tExportDefault: $TypeOf<typeof AnimatedTransform>;
export default $f2tExportDefault;