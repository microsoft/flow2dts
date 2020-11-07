import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var Blob: $TypeOf<typeof $1>;
import $1 from "./Blob";
import { BlobOptions } from "./BlobTypes";
declare class File extends $2 {
  /**
   * Constructor for JS consumers.
   */
  constructor: (parts: (Blob | string)[], name: string, options?: BlobOptions) => void;
  name: () => string;
  lastModified: () => number;
}
declare var $2: $TypeOf<typeof Blob>;
declare const $f2tExportDefault: $TypeOf<typeof File>;
export default $f2tExportDefault;