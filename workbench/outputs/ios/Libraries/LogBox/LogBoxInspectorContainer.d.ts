// @flow
import * as React from "react";
import LogBoxLog from "./Data/LogBoxLog";
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
declare export default React.AbstractComponent<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{}>;