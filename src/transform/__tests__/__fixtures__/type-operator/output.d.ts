declare var value: {
  someKey: string
}
declare type T = typeof value
declare type K = keyof T
declare class Foo {}
declare type Foo$Type = Foo

declare class Bar {}

declare type Bar$Type = Bar
