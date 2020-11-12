import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type CapturedError = {
  readonly componentStack: string;
  readonly error: unknown;
  readonly errorBoundary: null | undefined | {};
};
declare function showErrorDialog(capturedError: CapturedError): boolean;
export type { CapturedError };
declare namespace $f2tExportDefaultRedirect {
  export declare const $f2tHidden_showErrorDialog: $TypeOf<typeof showErrorDialog>;
}
declare namespace $f2tExportDefault {
  export declare const showErrorDialog: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_showErrorDialog>;
  export type showErrorDialog = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_showErrorDialog>;
}
export default $f2tExportDefault;