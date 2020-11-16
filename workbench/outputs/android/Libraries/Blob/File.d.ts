import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./Blob";
import { BlobOptions } from "./BlobTypes";
declare class File extends $1 {
  /**
   * Constructor for JS consumers.
   */
  constructor(parts: ($TypeOf<typeof $1> | string)[], name: string, options?: BlobOptions);
  name(): string;
  lastModified(): number;
}
export default File;