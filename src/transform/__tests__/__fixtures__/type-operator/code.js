declare var value: {
  someKey: string,
}
type T = typeof value
type K = $Keys<T>
declare class Foo {}
type Foo$Type = typeof Foo
class Bar {}
type Bar$Type = typeof Bar
