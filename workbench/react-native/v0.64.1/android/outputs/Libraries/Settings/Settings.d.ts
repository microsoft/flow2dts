// @flow
declare var Settings:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  get: (key: string) => unknown;
  set: (settings: Object) => void;
  watchKeys: (keys: string | string[], callback: Function) => number;
  clearWatch: (watchId: number) => void;
};
declare const $f2tExportDefault: typeof Settings;
export default $f2tExportDefault;