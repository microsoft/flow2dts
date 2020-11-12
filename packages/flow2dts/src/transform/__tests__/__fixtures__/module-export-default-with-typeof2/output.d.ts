import { $TypeOf } from "flow2dts-flow-types-polyfill"
declare function foo(a: string): number
declare class Bar {}
declare namespace $f2tExportDefaultRedirect {
  export const $f2tHidden_foo: $TypeOf<typeof foo>
  export const $f2tHidden_Bar: $TypeOf<typeof Bar>
}
declare namespace $f2tExportDefault {
  export const foo: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_foo>
  export type foo = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_foo>
  export const Bar: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_Bar>
  export type Bar = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_Bar>
}
export default $f2tExportDefault
