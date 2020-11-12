declare function foo(a: string): number
declare class Bar {}
declare module.exports: {|
  foo: typeof foo,
  Bar: typeof Bar,
|}
