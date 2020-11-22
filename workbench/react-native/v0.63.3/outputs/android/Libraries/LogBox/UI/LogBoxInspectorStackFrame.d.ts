import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import { PressEvent } from "../../Types/CoreEventTypes";
import { StackFrame } from "../../Core/NativeExceptionsManager";
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  frame: StackFrame;
  onPress?: null | undefined | ((event: PressEvent) => void);
}>;
declare function LogBoxInspectorStackFrame(props: Props): React.Node;
declare const $f2tExportDefault: $TypeOf<typeof LogBoxInspectorStackFrame>;
export default $f2tExportDefault;