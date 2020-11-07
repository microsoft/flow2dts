import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type DevServerInfo = {
  url: string;
  bundleLoadedFromServer: boolean;
};
declare function getDevServer() => DevServerInfo;
declare const $f2tExportDefault: $TypeOf<typeof getDevServer>;
export default $f2tExportDefault;