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
  foo: typeof foo
  Bar: typeof Bar
  bar: typeof Bar.bar
  baz: typeof baz
  inline: () => boolean
}
export default $f2tExportDefault
