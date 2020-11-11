import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import type { StackFrame } from "../NativeExceptionsManager";
declare type ExtendedError = Error & {
  jsEngine?: string;
  preventSymbolication?: boolean;
  componentStack?: string;
  forceRedbox?: boolean;
  isComponentError?: boolean;
};
declare function parseErrorStack(errorStack?: string): StackFrame[];
export type { ExtendedError };
declare const $f2tExportDefault: $TypeOf<typeof parseErrorStack>;
export default $f2tExportDefault;