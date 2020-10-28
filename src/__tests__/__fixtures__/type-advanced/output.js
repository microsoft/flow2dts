declare type a = number[]
declare type b = const number[]
declare type c = [number, string, boolean]
declare type d =
    /*[FLOW2DTS - Warning] This type alias was opaque in the original Flow source.*/
    number
declare type e = number | string | boolean
declare type f = number & string & boolean
