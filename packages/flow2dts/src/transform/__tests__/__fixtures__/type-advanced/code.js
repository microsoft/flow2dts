type a = Array<number>
type b = $ReadOnlyArray<number>
type c = [number, () => void, boolean]
type d = number | () => void | boolean // prettier-ignore
type e = number & () => void & boolean // prettier-ignore
// type f = (() => void)[]
opaque type g = number
