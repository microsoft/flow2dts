declare const Blob;
import { BlobData } from "./BlobTypes";
import { BlobOptions } from "./BlobTypes";
declare class BlobManager {
  isAvailable: boolean;
  createFromParts: (parts: (Blob | string)[], options?: BlobOptions) => Blob;
  createFromOptions: (options: BlobData) => Blob;
  release: (blobId: string) => void;
  addNetworkingHandler: () => void;
  addWebSocketHandler: (socketId: number) => void;
  removeWebSocketHandler: (socketId: number) => void;
  sendOverSocket: (blob: Blob, socketId: number) => void;
}
declare const $f2tExportDefault: typeof BlobManager;
export default $f2tExportDefault;