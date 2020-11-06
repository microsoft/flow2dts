// @flow
declare var Blob: typeof $1;
declare const $1;
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
declare const $f2tExportDefault: BlobManager;
export default $f2tExportDefault;