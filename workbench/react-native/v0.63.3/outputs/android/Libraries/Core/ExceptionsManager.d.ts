// @flow
import { ExceptionData } from "./NativeExceptionsManager";
declare class SyntheticError extends Error {
  name: string;
}
declare type ExceptionDecorator = ($f2t1: ExceptionData) => ExceptionData;
declare function unstable_setExceptionDecorator(exceptionDecorator?: null | undefined | ExceptionDecorator): void;
declare function handleException(e: unknown, isFatal: boolean): void;
declare function installConsoleErrorReporter(): void;
declare const $f2d_SyntheticError: SyntheticError;
export { handleException, installConsoleErrorReporter, $f2d_SyntheticError as SyntheticError, unstable_setExceptionDecorator };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  handleException: typeof handleException;
  installConsoleErrorReporter: typeof installConsoleErrorReporter;
  SyntheticError: SyntheticError;
  unstable_setExceptionDecorator: typeof unstable_setExceptionDecorator;
};
export default $f2tExportDefault;