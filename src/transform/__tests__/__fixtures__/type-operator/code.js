declare var value: {
  someKey: string,
}
type T = typeof value
type K = $Keys<T>
