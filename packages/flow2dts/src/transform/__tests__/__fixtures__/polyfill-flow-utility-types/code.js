type T = {
  foo: string,
  bar: number,
}
type A = [string, number]
type K = $Keys<T>
type D = $Diff<T, { bar: number }>
type P = $PropertyType<T, "foo">
type E1 = $ElementType<T, "foo">
type E2 = $ElementType<A, "1">
type FR = $Call<() => number>
type S = $Shape<T>
type NM = $NonMaybeType<number | null | undefined>
type C = Class<T>
type EX = $Exact<T>
type OMF = $ObjMap<T, () => boolean>
type _OMTWithSingle = () => boolean
type OMTWithSingle = $ObjMapi<T, _OMTWithSingle>
type _OMTWithUnion = () => true | 42 | "42" | any | void | unknown | null | undefined
type OMTWithUnion = $ObjMap<T, _OMTWithUnion>
