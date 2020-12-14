import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import LogBoxLog$f2tTypeof from "../Data/LogBoxLog";
declare type LogBoxLog = $TypeOf<typeof LogBoxLog$f2tTypeof>;
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  log: LogBoxLog;
}>;
declare function LogBoxInspectorReactFrames(props: Props): React.Node;
declare const $f2tExportDefault: typeof LogBoxInspectorReactFrames;
export default $f2tExportDefault;