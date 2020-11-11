import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import type { IPerformanceLogger } from "../Utilities/createPerformanceLogger";
import $1 from "react";
declare function renderApplication<Props extends Object>(RootComponent: $1.ComponentType<Props>, initialProps: Props, rootTag: any, WrapperComponent?: null | undefined | $1.ComponentType<any>, fabric?: boolean, showArchitectureIndicator?: boolean, scopedPerformanceLogger?: IPerformanceLogger, isLogBox?: boolean): void;
declare const $f2tExportDefault: $TypeOf<typeof renderApplication>;
export default $f2tExportDefault;