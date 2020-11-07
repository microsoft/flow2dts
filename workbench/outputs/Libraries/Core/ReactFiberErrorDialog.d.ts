import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type CapturedError = {
  readonly componentStack: string;
  readonly error: unknown;
  readonly errorBoundary: null | undefined | {};
};
declare function showErrorDialog(capturedError: CapturedError) => boolean;
export type { CapturedError };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  showErrorDialog: $TypeOf<typeof showErrorDialog>;
};
export default $f2tExportDefault;