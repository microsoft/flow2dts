import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./AnimatedNode";
declare class AnimatedWithChildren extends $1 {
  constructor();
  __makeNative(): void;
  __addChild(child: $TypeOf<typeof $1>): void;
  __removeChild(child: $TypeOf<typeof $1>): void;
  __getChildren(): $TypeOf<typeof $1>[];
  __callListeners(value: number): void;
}
export default AnimatedWithChildren;