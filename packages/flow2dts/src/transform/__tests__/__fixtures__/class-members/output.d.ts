declare class CA {
  a: string
  b: null | undefined | string
  get e(): string
  set e(value: string)
}

declare class CB1 {
  constructor()
}

declare class CB2 {
  constructor(a: string, b?: null | undefined | number, ...c: number[])
}

declare class CC {
  c(): void
  d(a: string, b?: null | undefined | number, ...c: number[]): boolean
}

declare class CD<T> {
  static a: string
  static b: /*[FLOW2DTS - Warning] This was typed using the `T` type parameter*/ unknown
}

declare class CE {
  constructor(a: string)
  foo(b: string): number
  static a: string
  b: null | undefined | string
}
