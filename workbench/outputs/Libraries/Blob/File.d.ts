declare const Blob;
import { BlobOptions } from "./BlobTypes";
declare class File extends Blob {
  /**
     * Constructor for JS consumers.
     */
  constructor: (parts: (Blob | string)[], name: string, options?: BlobOptions) => void;
  name: () => string;
  lastModified: () => number;
}
declare const $f2tExportDefault: typeof File;
export default $f2tExportDefault;