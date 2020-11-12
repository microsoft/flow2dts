import { $TypeOf } from "flow2dts-flow-types-polyfill";
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
declare const $f2tExportDefault: $TypeOf<typeof File>;
export default $f2tExportDefault;