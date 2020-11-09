import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var HeapCapture:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  captureHeap: (path: string) => void;
};
declare const $f2tExportDefault: $TypeOf<typeof HeapCapture>;
export default $f2tExportDefault;