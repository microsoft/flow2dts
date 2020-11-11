import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import type { IPerformanceLogger } from "./createPerformanceLogger";
declare var PerformanceLoggerContext: React.Context<IPerformanceLogger>;
declare const $f2tExportDefault: $TypeOf<typeof PerformanceLoggerContext>;
export default $f2tExportDefault;