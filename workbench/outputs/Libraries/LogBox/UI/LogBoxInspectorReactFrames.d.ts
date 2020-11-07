import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import LogBoxLog from "../Data/LogBoxLog";
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  log: LogBoxLog;
}>;
declare function LogBoxInspectorReactFrames(props: Props) => React.Node;
declare export default $TypeOf<typeof LogBoxInspectorReactFrames>;