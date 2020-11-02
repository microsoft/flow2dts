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
