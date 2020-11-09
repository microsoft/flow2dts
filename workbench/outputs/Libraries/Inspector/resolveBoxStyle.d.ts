import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare function resolveBoxStyle(prefix: string, style: Object): null | undefined | Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  bottom: number;
  left: number;
  right: number;
  top: number;
}>;
declare const $f2tExportDefault: $TypeOf<typeof resolveBoxStyle>;
export default $f2tExportDefault;