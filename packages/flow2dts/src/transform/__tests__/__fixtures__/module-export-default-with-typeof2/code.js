declare function foo(a: string): number
declare class Bar {
  static bar: string;
}
declare var baz: 42
declare module.exports: {|
  foo: typeof foo,
  Bar: typeof Bar,
  bar: typeof Bar.bar,
  baz: typeof baz,
  inline: () => boolean,
|}
