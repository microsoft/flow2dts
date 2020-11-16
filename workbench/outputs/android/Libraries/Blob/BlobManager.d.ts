import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./Blob";
import { BlobData } from "./BlobTypes";
import { BlobOptions } from "./BlobTypes";
declare class BlobManager {
  static isAvailable: boolean;
  createFromParts(parts: ($TypeOf<typeof $1> | string)[], options?: BlobOptions): $TypeOf<typeof $1>;
  createFromOptions(options: BlobData): $TypeOf<typeof $1>;
  release(blobId: string): void;
  addNetworkingHandler(): void;
  addWebSocketHandler(socketId: number): void;
  removeWebSocketHandler(socketId: number): void;
  sendOverSocket(blob: $TypeOf<typeof $1>, socketId: number): void;
}
export default BlobManager;