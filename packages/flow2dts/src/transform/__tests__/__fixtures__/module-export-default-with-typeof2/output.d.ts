import { $TypeOf } from "flow2dts-flow-types-polyfill"
declare function foo(a: string): number
declare class Bar {
  static bar: string
}
declare var baz: 42
declare const $f2d_bar: typeof Bar.bar
declare const $f2d_inline: () => boolean
export { foo, Bar, $f2d_bar as bar, baz, $f2d_inline as inline }
declare const $f2tExportDefault: /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  foo: $TypeOf<typeof foo>
  Bar: typeof Bar
  bar: $TypeOf<typeof Bar.bar>
  baz: $TypeOf<typeof baz>
  inline: () => boolean
}
export default $f2tExportDefault
