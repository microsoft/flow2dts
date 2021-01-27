import $1 from "./Blob";
import { BlobOptions } from "./BlobTypes";
declare class File extends $1 {
  /**
   * Constructor for JS consumers.
   */
  constructor(parts: (typeof $1 | string)[], name: string, options?: BlobOptions);
  name(): string;
  lastModified(): number;
}
declare const $f2tExportDefault: File;
export default $f2tExportDefault;