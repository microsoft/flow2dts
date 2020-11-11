import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import type { HMRClientNativeInterface } from "./HMRClient";
declare var HMRClientProdShim: HMRClientNativeInterface;
declare const $f2tExportDefault: $TypeOf<typeof HMRClientProdShim>;
export default $f2tExportDefault;