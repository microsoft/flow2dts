import { $Call, $Diff, $ElementType, $Keys, $NonMaybeType, $PropertyType, $Shape, Class } from "utility-types"
declare type T = {
  foo: string
  bar: number
}
declare type A = [string, number]
declare type K = $Keys<T>
declare type D = $Diff<
  T,
  {
    bar: number
  }
>
declare type P = $PropertyType<T, "foo">
declare type E1 = $ElementType<T, "foo">
declare type E2 = $ElementType<A, "1">
declare type FR = $Call<() => number>
declare type S = $Shape<T>
declare type NM = $NonMaybeType<number | null | undefined>
declare type C = Class<T>
declare type EX =
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  T
declare type OM =
  /*[FLOW2DTS - Warning] This type was a $ObjMap type in the original Flow source.*/
  { [K in keyof T]: ReturnType<() => boolean> }
