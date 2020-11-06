declare type a = {}
declare type b = Readonly<{
  x: string
  y: number
  z: boolean
}>
declare type c = {
  [a: number]: string
}
declare type d = {
  [$f2tKey: number]: string
}
