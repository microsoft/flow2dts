import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var RCTEventEmitter:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  register: (eventEmitter: any) => void;
};
declare const $f2tExportDefault: $TypeOf<typeof RCTEventEmitter>;
export default $f2tExportDefault;