import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedNode: $TypeOf<typeof $1>;
import $1 from "./AnimatedNode";
declare class AnimatedProps extends $2 {
  constructor: (props: Object, callback: () => void) => void;
  __getValue: () => Object;
  __getAnimatedValue: () => Object;
  __attach: () => void;
  __detach: () => void;
  update: () => void;
  __makeNative: () => void;
  setNativeView: (animatedView: any) => void;
  __connectAnimatedView: () => void;
  __disconnectAnimatedView: () => void;
  __restoreDefaultValues: () => void;
  __getNativeConfig: () => Object;
}
declare var $2: $TypeOf<typeof AnimatedNode>;
declare const $f2tExportDefault: $TypeOf<typeof AnimatedProps>;
export default $f2tExportDefault;