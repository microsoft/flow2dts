import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { IPerformanceLogger } from "./createPerformanceLogger";
declare var GlobalPerformanceLogger: IPerformanceLogger;
declare const $f2tExportDefault: $TypeOf<typeof GlobalPerformanceLogger>;
export default $f2tExportDefault;