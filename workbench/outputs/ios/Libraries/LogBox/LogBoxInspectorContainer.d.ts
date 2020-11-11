import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import LogBoxLog$f2tTypeof from "./Data/LogBoxLog";
declare type LogBoxLog = $TypeOf<typeof LogBoxLog$f2tTypeof>;
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  logs: ReadonlyArray<LogBoxLog>;
  selectedLogIndex: number;
  isDisabled?: null | undefined | boolean;
}>;
declare class _LogBoxInspectorContainer extends React.Component<Props> {
  render(): React.Node;
}
export { _LogBoxInspectorContainer };
declare const $f2tExportDefault: React.AbstractComponent<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{}>;
export default $f2tExportDefault;