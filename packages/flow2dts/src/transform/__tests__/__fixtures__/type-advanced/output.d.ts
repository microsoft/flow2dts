declare type a = number[]
declare type b = ReadonlyArray<number>
declare type c = [number, () => void, boolean]
declare type d = number | (() => void) | boolean
declare type e = number & (() => void) & boolean // type f = (() => void)[]

/*[FLOW2DTS - Warning] This type alias was opaque in the original Flow source.*/
declare type g = number
