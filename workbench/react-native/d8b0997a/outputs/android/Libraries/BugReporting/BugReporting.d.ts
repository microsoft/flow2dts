// @flow
declare type ExtraData = {
  [key: string]: string;
};
declare type SourceCallback = () => string;
declare type DebugData = {
  extras: ExtraData;
  files: ExtraData;
};
declare class BugReporting {
  static addSource(key: string, callback: SourceCallback): {
    remove: () => void;
  };
  static addFileSource(key: string, callback: SourceCallback): {
    remove: () => void;
  };
  static collectExtraData(): DebugData;
}
declare const $f2tExportDefault: BugReporting;
export default $f2tExportDefault;