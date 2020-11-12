import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { ExceptionData } from "./NativeExceptionsManager";
declare class SyntheticError extends Error {
  name: string;
}
declare type ExceptionDecorator = ($f2t1: ExceptionData) => ExceptionData;
declare function unstable_setExceptionDecorator(exceptionDecorator: null | undefined | ExceptionDecorator): void;
declare function handleException(e: unknown, isFatal: boolean): void;
declare function installConsoleErrorReporter(): void;
declare namespace $f2tExportDefaultRedirect {
  export declare const $f2tHidden_handleException: $TypeOf<typeof handleException>;
  export declare const $f2tHidden_installConsoleErrorReporter: $TypeOf<typeof installConsoleErrorReporter>;
  export declare const $f2tHidden_SyntheticError: $TypeOf<typeof SyntheticError>;
  export declare const $f2tHidden_unstable_setExceptionDecorator: $TypeOf<typeof unstable_setExceptionDecorator>;
}
declare namespace $f2tExportDefault {
  export declare const handleException: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_handleException>;
  export declare const installConsoleErrorReporter: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_installConsoleErrorReporter>;
  export declare const SyntheticError: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_SyntheticError>;
  export declare const unstable_setExceptionDecorator: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_unstable_setExceptionDecorator>;
}
export default $f2tExportDefault;