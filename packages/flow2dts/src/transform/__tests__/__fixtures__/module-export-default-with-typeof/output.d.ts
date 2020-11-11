import { $TypeOf } from "flow2dts-flow-types-polyfill"
declare function foo(a: string): number
declare const $f2tExportDefault: $TypeOf<typeof foo>
export default $f2tExportDefault
