declare type CapturedError = {
  readonly componentName: null | undefined | string;
  readonly componentStack: string;
  readonly error: unknown;
  readonly errorBoundary: null | undefined | {};
  readonly errorBoundaryFound: boolean;
  readonly errorBoundaryName: string | null;
  readonly willRetry: boolean;
};
declare function showErrorDialog(capturedError: CapturedError) => boolean;
export type { CapturedError };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  showErrorDialog: typeof showErrorDialog;
};
export default $f2tExportDefault;