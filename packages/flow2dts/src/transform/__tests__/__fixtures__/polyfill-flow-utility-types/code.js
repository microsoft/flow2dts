type T = {
  foo: string,
  bar: number,
}
type K = $Keys<T>
type D = $Diff<T, { bar: number }>
