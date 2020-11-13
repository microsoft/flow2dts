// @flow
declare class Dimensions {
  get(dim: string): Object;
  set(dims: Readonly<{
    [key: string]: any;
  }>): void;
  addEventListener(type: "change", handler: Function): void;
  removeEventListener(type: "change", handler: Function): void;
}
export default Dimensions;