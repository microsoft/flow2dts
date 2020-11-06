// @flow
import { IgnorePattern } from "./Data/LogBoxData";
declare const $f2tExportDefault: {
  ignoreLogs: ($f2t1: ReadonlyArray<IgnorePattern>) => void;
  ignoreAllLogs: ($f2t1: null | undefined | boolean) => void;
  install: () => void;
  uninstall: () => void;
};
export default $f2tExportDefault;