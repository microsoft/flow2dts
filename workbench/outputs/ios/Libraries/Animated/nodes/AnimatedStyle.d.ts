import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $2 from "./AnimatedWithChildren";
declare class AnimatedStyle extends $2 {
  constructor(style: any);
  __getValue(): Object;
  __getAnimatedValue(): Object;
  __attach(): void;
  __detach(): void;
  __makeNative(): void;
  __getNativeConfig(): Object;
}
declare const $f2tExportDefault: $TypeOf<typeof AnimatedStyle>;
export default $f2tExportDefault;