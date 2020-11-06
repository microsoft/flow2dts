declare const Blob;
declare type ReadyState = 0 | 1 | 2;
declare type ReaderResult = string | ArrayBuffer;
declare class FileReader extends $TEMPORARY$Super$FlowFixMe {
  EMPTY: number;
  LOADING: number;
  DONE: number;
  EMPTY: number;
  LOADING: number;
  DONE: number;
  constructor: () => void;
  readAsArrayBuffer: () => void;
  readAsDataURL: (blob: null | undefined | Blob) => void;
  readAsText: (blob: null | undefined | Blob, encoding?: string) => void;
  abort: () => void;
  readyState: () => ReadyState;
  error: () => null | undefined | Error;
  result: () => null | undefined | ReaderResult;
}
declare const $f2tExportDefault: typeof FileReader;
export default $f2tExportDefault;