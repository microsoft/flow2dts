declare function a/*[FLOW2DTS - Warning] Covariance and contravariance are ignored.*/ <
  T,
  U,
  V extends Number,
  W = String
>(t: T, u: U, v: V, w: W): void
declare type b/*[FLOW2DTS - Warning] Covariance and contravariance are ignored.*/ <
  T,
  U,
  V extends Number,
  W = String
> = {
  t: T
  u: U
  v: V
  w: W
}
interface c/*[FLOW2DTS - Warning] Covariance and contravariance are ignored.*/ <T, U, V extends Number, W = String> {
  t: T
  u: U
  v: V
  w: W
}

declare class d/*[FLOW2DTS - Warning] Covariance and contravariance are ignored.*/ <
  T,
  U,
  V extends Number,
  W = String
> {
  t: T
  u: U
  v: V
  w: W
}

declare type e = {
  a: /*[FLOW2DTS - Warning] Covariance and contravariance are ignored.*/
  <T, U, V extends Number, W = String>(t: T, u: U, v: V, w: W) => void

  /*[FLOW2DTS - Warning] Covariance and contravariance are ignored.*/
  <T, U, V extends Number, W = String>(t: T, u: U, v: V, w: W): void
}
