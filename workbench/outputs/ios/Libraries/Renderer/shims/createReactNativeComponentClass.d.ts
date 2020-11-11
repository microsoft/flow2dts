import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import type { ViewConfigGetter } from "./ReactNativeTypes";
declare var createReactNativeComponentClass: (name: string, callback: ViewConfigGetter) => string;
declare const $f2tExportDefault: $TypeOf<typeof createReactNativeComponentClass>;
export default $f2tExportDefault;