import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $2 from "../Components/View/View";
import $1 from "react";
declare type AnimatedComponentType<Props extends {
  readonly [$f2tKey: string]: unknown;
}, Instance> = $1<$ObjMap<Props & Readonly<{
  passthroughAnimatedPropExplicitValues?: $1<$2>;
}>, () => any>, Instance>;
declare function createAnimatedComponent<Props extends {
  readonly [$f2tKey: string]: unknown;
}, Instance>(Component: $1<Props, Instance>): AnimatedComponentType<Props, Instance>;
export type { AnimatedComponentType };
declare const $f2tExportDefault: $TypeOf<typeof createAnimatedComponent>;
export default $f2tExportDefault;