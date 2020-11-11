import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $2 from "./AnimatedWithChildren";
declare class AnimatedTransform extends $2 {
  constructor(transforms: ReadonlyArray<Object>);
  __makeNative(): void;
  __getValue(): ReadonlyArray<Object>;
  __getAnimatedValue(): ReadonlyArray<Object>;
  __attach(): void;
  __detach(): void;
  __getNativeConfig(): any;
}
declare const $f2tExportDefault: $TypeOf<typeof AnimatedTransform>;
export default $f2tExportDefault;