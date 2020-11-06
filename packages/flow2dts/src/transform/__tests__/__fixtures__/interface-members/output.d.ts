interface IA {
  readonly a: string

  /*[FLOW2DTS - Warning] This property was a write-only property in the original Flow source.*/
  b?: null | undefined | string
}
interface IB1 {
  [x: string]: number
}
interface IB2 {
  [$f2tKey: string]: number
}
interface IC {
  c: () => void
  d: (a: string, b?: null | undefined | number, ...c: number[]) => boolean
}
interface ID {
  (): void
  (a: string, b?: null | undefined | number, ...c: number[]): boolean
}
