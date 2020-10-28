declare type a = {}
declare type b = {
  x: string;
  y: number;
  z: boolean;
}
declare type c = {
  [a: number]: string;
}
declare type d = {
  [$: number]: string;
}
