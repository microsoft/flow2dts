import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var warningHandler: null | undefined | (...$f2tRest: unknown[]) => void;
declare var RCTLog:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  // level one of log, info, warn, error, mustfix
  logIfNoNativeHook: (level: string, ...args: unknown[]) => void;
  // Log to console regardless of nativeLoggingHook
  logToConsole: (level: string, ...args: unknown[]) => void;
  setWarningHandler: (handler: $TypeOf<typeof warningHandler>) => void;
};
declare const $f2tExportDefault: $TypeOf<typeof RCTLog>;
export default $f2tExportDefault;