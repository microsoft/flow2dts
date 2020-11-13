import { $TypeOf } from "flow2dts-flow-types-polyfill"
import { $Keys } from "utility-types"
declare var value: {
  someKey: string
}
declare type T = $TypeOf<typeof value>
declare type K = $Keys<T>
declare class Foo {}
declare type Foo$Type = Foo

declare class Bar {}

declare type Bar$Type = Bar
