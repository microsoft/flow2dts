// @flow
declare class Dimensions {
  static get(dim: string): Object;
  static set(dims: Readonly<{
    [key: string]: any;
  }>): void;
  static addEventListener(type: "change", handler: Function): void;
  static removeEventListener(type: "change", handler: Function): void;
}
export default Dimensions;