import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import { CodeFrame } from "../Data/parseLogBoxLog";
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  codeFrame: null | undefined | CodeFrame;
}>;
declare function LogBoxInspectorCodeFrame(props: Props): React.Node;
declare export default $TypeOf<typeof LogBoxInspectorCodeFrame>;