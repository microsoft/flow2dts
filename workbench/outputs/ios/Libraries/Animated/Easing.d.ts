import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare class Easing {
  step0: (n: number) => number;
  step1: (n: number) => number;
  linear: (t: number) => number;
  ease: (t: number) => number;
  quad: (t: number) => number;
  cubic: (t: number) => number;
  poly: (n: number) => (t: number) => number;
  sin: (t: number) => number;
  circle: (t: number) => number;
  exp: (t: number) => number;
  elastic: (bounciness?: number) => (t: number) => number;
  back: (s?: number) => (t: number) => number;
  bounce: (t: number) => number;
  bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => number;
  in: (easing: (t: number) => number) => (t: number) => number;
  out: (easing: (t: number) => number) => (t: number) => number;
  inOut: (easing: (t: number) => number) => (t: number) => number;
}
declare const $f2tExportDefault: $TypeOf<typeof Easing>;
export default $f2tExportDefault;