import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./AnimatedNode";
declare class AnimatedWithChildren extends $1 {
  constructor: () => void;
  __makeNative: () => void;
  __addChild: (child: $1) => void;
  __removeChild: (child: $1) => void;
  __getChildren: () => $1[];
  __callListeners: (value: number) => void;
}
declare const $f2tExportDefault: $TypeOf<typeof AnimatedWithChildren>;
export default $f2tExportDefault;