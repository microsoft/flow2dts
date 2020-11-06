declare const AnimatedWithChildren;
declare class AnimatedTransform extends AnimatedWithChildren {
  constructor: (transforms: ReadonlyArray<Object>) => void;
  __makeNative: () => void;
  __getValue: () => ReadonlyArray<Object>;
  __getAnimatedValue: () => ReadonlyArray<Object>;
  __attach: () => void;
  __detach: () => void;
  __getNativeConfig: () => any;
}
declare const $f2tExportDefault: typeof AnimatedTransform;
export default $f2tExportDefault;