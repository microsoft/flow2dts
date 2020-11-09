import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import { Int32 } from "../../Types/CodegenTypes";
interface TextInputNativeCommands<T> {
  readonly focus: (viewRef: React.ElementRef<T>) => void;
  readonly blur: (viewRef: React.ElementRef<T>) => void;
  readonly setTextAndSelection: (viewRef: React.ElementRef<T>, mostRecentEventCount: Int32, value: null | undefined | string, start: Int32, end: Int32) => void;
}
declare var supportedCommands: (string | string | string)[];
export type { TextInputNativeCommands };
declare export default $TypeOf<typeof supportedCommands>;