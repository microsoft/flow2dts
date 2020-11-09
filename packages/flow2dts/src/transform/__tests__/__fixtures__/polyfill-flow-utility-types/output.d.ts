import { $Keys } from "utility-types"
declare type T = {
  foo: string
  bar: number
}
declare type K = $Keys<T>
