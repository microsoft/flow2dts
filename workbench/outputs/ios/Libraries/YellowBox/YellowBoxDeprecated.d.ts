import { Class } from "utility-types";
import $1 from "react";
import { IgnorePattern } from "../LogBox/Data/LogBoxData";
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{}>;
declare const $f2tExportDefault: Class<$1.Component<Props>> & {
  ignoreWarnings: ($f2t1: ReadonlyArray<IgnorePattern>) => void;
  install: () => void;
  uninstall: () => void;
};
export default $f2tExportDefault;