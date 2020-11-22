import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./Blob";
import { BlobData } from "./BlobTypes";
import { BlobOptions } from "./BlobTypes";
declare class BlobManager {
  static isAvailable: boolean;
  static createFromParts(parts: ($TypeOf<typeof $1> | string)[], options?: BlobOptions): $TypeOf<typeof $1>;
  static createFromOptions(options: BlobData): $TypeOf<typeof $1>;
  static release(blobId: string): void;
  static addNetworkingHandler(): void;
  static addWebSocketHandler(socketId: number): void;
  static removeWebSocketHandler(socketId: number): void;
  static sendOverSocket(blob: $TypeOf<typeof $1>, socketId: number): void;
}
export default BlobManager;