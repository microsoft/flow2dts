// @flow
import { IgnorePattern } from "./Data/LogBoxData";
declare const $f2t_ignoreLogs: ($f2t1: ReadonlyArray<IgnorePattern>) => void;
declare const $f2t_ignoreAllLogs: ($f2t1: null | undefined | boolean) => void;
declare const $f2t_install: () => void;
declare const $f2t_uninstall: () => void;
export { $f2t_ignoreLogs as ignoreLogs, $f2t_ignoreAllLogs as ignoreAllLogs, $f2t_install as install, $f2t_uninstall as uninstall };
declare const $f2tExportDefault: {
  ignoreLogs: ($f2t1: ReadonlyArray<IgnorePattern>) => void;
  ignoreAllLogs: ($f2t1: null | undefined | boolean) => void;
  install: () => void;
  uninstall: () => void;
};
export default $f2tExportDefault;