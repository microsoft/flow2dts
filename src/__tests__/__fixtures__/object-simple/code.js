type a = {}
type b = $ReadOnly<{
  x: string,
  y: number,
  z: boolean,
}>
type c = {
  [a: number]: string,
}
type d = {
  [number]: string,
}
