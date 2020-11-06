// @flow
declare var AnimatedNode: typeof $1;
declare const $1;
declare class AnimatedWithChildren extends $2 {
  constructor: () => void;
  __makeNative: () => void;
  __addChild: (child: AnimatedNode) => void;
  __removeChild: (child: AnimatedNode) => void;
  __getChildren: () => AnimatedNode[];
  __callListeners: (value: number) => void;
}
declare var $2: typeof AnimatedNode;
declare const $f2tExportDefault: typeof AnimatedWithChildren;
export default $f2tExportDefault;