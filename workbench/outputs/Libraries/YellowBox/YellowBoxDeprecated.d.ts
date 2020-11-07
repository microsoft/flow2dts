import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var React: $TypeOf<typeof $1>;
declare const $1;
import { IgnorePattern } from "../LogBox/Data/LogBoxData";
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{}>;
declare const $f2tExportDefault: Class & {
  ignoreWarnings: ($f2t1: ReadonlyArray<IgnorePattern>) => void;
  install: () => void;
  uninstall: () => void;
};
export default $f2tExportDefault;