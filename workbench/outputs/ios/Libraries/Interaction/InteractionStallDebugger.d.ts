import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var InteractionStallDebugger:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  install: (options: {
    thresholdMS: number;
  }) => void;
};
declare const $f2tExportDefault: $TypeOf<typeof InteractionStallDebugger>;
export default $f2tExportDefault;