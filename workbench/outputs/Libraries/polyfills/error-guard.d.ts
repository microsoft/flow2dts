// @flow
declare type ErrorHandler = (error: unknown, isFatal: boolean) => void;
declare type Fn<Args, Return> = (...$f2tRest: Args) => Return;
declare var ErrorUtils:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  setGlobalHandler: (fun: ErrorHandler) => void;
  getGlobalHandler: () => ErrorHandler;
  reportError: (error: unknown) => void;
  reportFatalError: (error: unknown) => void;
  applyWithGuard: <TArgs extends ReadonlyArray<unknown>, TOut>(fun: Fn, context?: null | undefined | unknown, args?: null | undefined | TArgs, unused_onError?: null, unused_name?: null | undefined | string) => null | undefined | TOut;
  applyWithGuardIfNeeded: <TArgs extends ReadonlyArray<unknown>, TOut>(fun: Fn, context?: null | undefined | unknown, args?: null | undefined | TArgs) => null | undefined | TOut;
  inGuard: () => boolean;
  guard: <TArgs extends ReadonlyArray<unknown>, TOut>(fun: Fn, name?: null | undefined | string, context?: null | undefined | unknown) => null | undefined | (...$f2tRest: TArgs) => null | undefined | TOut;
};
declare type ErrorUtilsT = typeof ErrorUtils;
export type { ErrorUtilsT };