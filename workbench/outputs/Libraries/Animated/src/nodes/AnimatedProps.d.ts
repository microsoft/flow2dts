declare const AnimatedNode;
declare class AnimatedProps extends AnimatedNode {
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
declare const $f2tExportDefault: typeof AnimatedProps;
export default $f2tExportDefault;