// @flow
declare var Blob: typeof $1;
declare const $1;
import { BlobOptions } from "./BlobTypes";
declare class File extends $2 {
  /**
   * Constructor for JS consumers.
   */
  constructor: (parts: (Blob | string)[], name: string, options?: BlobOptions) => void;
  name: () => string;
  lastModified: () => number;
}
declare var $2: typeof Blob;
declare const $f2tExportDefault: typeof File;
export default $f2tExportDefault;