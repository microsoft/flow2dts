import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedNode: $TypeOf<typeof $1>;
import $1 from "./AnimatedNode";
declare class AnimatedWithChildren extends $2 {
  constructor: () => void;
  __makeNative: () => void;
  __addChild: (child: AnimatedNode) => void;
  __removeChild: (child: AnimatedNode) => void;
  __getChildren: () => AnimatedNode[];
  __callListeners: (value: number) => void;
}
declare var $2: $TypeOf<typeof AnimatedNode>;
declare const $f2tExportDefault: $TypeOf<typeof AnimatedWithChildren>;
export default $f2tExportDefault;