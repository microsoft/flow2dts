import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type SpringConfigType = {
  stiffness: number;
  damping: number;
};
declare function fromOrigamiTensionAndFriction(tension: number, friction: number): SpringConfigType;
declare function fromBouncinessAndSpeed(bounciness: number, speed: number): SpringConfigType;
declare namespace $f2tExportDefaultRedirect {
  export const $f2tHidden_fromOrigamiTensionAndFriction: $TypeOf<typeof fromOrigamiTensionAndFriction>;
  export const $f2tHidden_fromBouncinessAndSpeed: $TypeOf<typeof fromBouncinessAndSpeed>;
}
declare namespace $f2tExportDefault {
  export const fromOrigamiTensionAndFriction: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_fromOrigamiTensionAndFriction>;
  export type fromOrigamiTensionAndFriction = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_fromOrigamiTensionAndFriction>;
  export const fromBouncinessAndSpeed: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_fromBouncinessAndSpeed>;
  export type fromBouncinessAndSpeed = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_fromBouncinessAndSpeed>;
}
export default $f2tExportDefault;