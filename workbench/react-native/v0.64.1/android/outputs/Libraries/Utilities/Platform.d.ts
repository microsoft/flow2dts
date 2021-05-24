// @flow
declare type PlatformSelectSpec<A, N, D> = {
  android?: A;
  native?: N;
  default?: D;
};
declare var Platform:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  __constants: null;
  OS: string;
  Version: number;
  constants:
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    isTesting: boolean;
    reactNativeVersion:
    /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
    {
      major: number;
      minor: number;
      patch: number;
      prerelease?: null | undefined | number;
    };
    Version: number;
    Release: string;
    Serial: string;
    Fingerprint: string;
    Model: string;
    ServerHost?: string;
    uiMode: string;
    Brand: string;
    Manufacturer: string;
  };
  isTesting: boolean;
  isTV: boolean;
  select: <A, N, D>(spec: PlatformSelectSpec<A, N, D>) => A | N | D;
};
export type { PlatformSelectSpec };
declare const $f2tExportDefault: typeof Platform;
export default $f2tExportDefault;