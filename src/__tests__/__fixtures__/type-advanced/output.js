declare type a = number[]
declare type b = readonly number[]
declare type c = [number, string, boolean]
/*[FLOW2DTS - Warning] This type alias was opaque in the original Flow source.*/
declare type d = number
declare type e = number | string | boolean
declare type f = number & string & boolean
