import { $TypeOf } from "flow2dts-flow-types-polyfill"
declare var value: {
  someKey: string
}
declare type T = $TypeOf<typeof value>
declare type K = keyof T
declare class Foo {}
declare type Foo$Type = $TypeOf<typeof Foo>

declare class Bar {}

declare type Bar$Type = $TypeOf<typeof Bar>
