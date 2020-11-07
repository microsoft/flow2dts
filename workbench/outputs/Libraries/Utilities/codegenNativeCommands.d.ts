import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type Options<T = string> = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  supportedCommands: ReadonlyArray<T>;
}>;
declare function codegenNativeCommands<T extends {}>(options: Options) => T;
declare export default $TypeOf<typeof codegenNativeCommands>;