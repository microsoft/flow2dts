import typeof MyClass from "MyClass"

declare module.exports: {|
  someKey: string,
  anotherKey: () => boolean,
  MyClass: MyClass,
|}
