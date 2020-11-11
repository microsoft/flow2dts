import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./Blob";
import { BlobData } from "./BlobTypes";
import { BlobOptions } from "./BlobTypes";
declare class BlobManager {
  isAvailable: boolean;
  createFromParts(parts: ($1 | string)[], options?: BlobOptions): $1;
  createFromOptions(options: BlobData): $1;
  release(blobId: string): void;
  addNetworkingHandler(): void;
  addWebSocketHandler(socketId: number): void;
  removeWebSocketHandler(socketId: number): void;
  sendOverSocket(blob: $1, socketId: number): void;
}
declare const $f2tExportDefault: $TypeOf<typeof BlobManager>;
export default $f2tExportDefault;