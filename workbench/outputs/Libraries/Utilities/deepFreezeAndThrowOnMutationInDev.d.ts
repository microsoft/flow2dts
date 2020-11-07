import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare function deepFreezeAndThrowOnMutationInDev<T extends Object>(object: T) => T;
declare const $f2tExportDefault: $TypeOf<typeof deepFreezeAndThrowOnMutationInDev>;
export default $f2tExportDefault;