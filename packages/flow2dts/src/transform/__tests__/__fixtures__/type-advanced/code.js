type a = Array<number>
type b = $ReadOnlyArray<number>
type c = [number, () => void, boolean]
type d = number | (() => void) | boolean
type e = number & (() => void) & boolean
type f = ?() => void
opaque type g = number
// type h = (() => void)[]
