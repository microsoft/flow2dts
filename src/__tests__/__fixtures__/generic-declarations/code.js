function a<+T, -U, V: Number, W = String>(t: T, u: U, v: V, w: W): void {}

type b<+T, -U, V: Number, W = String> = {
  t: T,
  u: U,
  v: V,
  w: W,
}

interface c<+T, -U, V: Number, W = String> {
  t: T;
  u: U;
  v: V;
  w: W;
}

class d<+T, -U, V: Number, W = String> {
  t: T
  u: U
  v: V
  w: W
}

type e = {
  <+T, -U, V: Number, W = String>(t: T, u: U, v: V, w: W): void,
  a<+T, -U, V: Number, W = String>(t: T, u: U, v: V, w: W): void,
}
