// @flow
declare var AnimatedNode: typeof $1;
declare const $1;
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
declare var $2: typeof AnimatedNode;
declare const $f2tExportDefault: AnimatedProps;
export default $f2tExportDefault;