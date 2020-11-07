import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var View: $TypeOf<typeof $2>;
import $2 from "../Components/View/View";
declare var React: $TypeOf<typeof $1>;
import $1 from "react";
declare type AnimatedComponentType<Props extends {
  readonly [$f2tKey: string]: unknown;
}, Instance> = React.AbstractComponent<$ObjMap, Instance>;
declare function createAnimatedComponent<Props extends {
  readonly [$f2tKey: string]: unknown;
}, Instance>(Component: React.AbstractComponent<Props, Instance>) => AnimatedComponentType;
export type { AnimatedComponentType };
declare const $f2tExportDefault: $TypeOf<typeof createAnimatedComponent>;
export default $f2tExportDefault;