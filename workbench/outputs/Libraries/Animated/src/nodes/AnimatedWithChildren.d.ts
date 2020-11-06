declare const AnimatedNode;
declare class AnimatedWithChildren extends AnimatedNode {
  constructor: () => void;
  __makeNative: () => void;
  __addChild: (child: AnimatedNode) => void;
  __removeChild: (child: AnimatedNode) => void;
  __getChildren: () => AnimatedNode[];
  __callListeners: (value: number) => void;
}
declare const $f2tExportDefault: typeof AnimatedWithChildren;
export default $f2tExportDefault;