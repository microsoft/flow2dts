import $1 from "./Blob";
import { BlobData } from "./BlobTypes";
import { BlobOptions } from "./BlobTypes";
declare class BlobManager {
  isAvailable: boolean;
  createFromParts(parts: (typeof $1 | string)[], options?: BlobOptions): typeof $1;
  createFromOptions(options: BlobData): typeof $1;
  release(blobId: string): void;
  addNetworkingHandler(): void;
  addWebSocketHandler(socketId: number): void;
  removeWebSocketHandler(socketId: number): void;
  sendOverSocket(blob: typeof $1, socketId: number): void;
}
export default BlobManager;