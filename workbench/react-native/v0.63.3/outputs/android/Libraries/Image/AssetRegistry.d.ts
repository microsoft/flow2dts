import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type PackagerAsset = {
  readonly __packager_asset: boolean;
  readonly fileSystemLocation: string;
  readonly httpServerLocation: string;
  readonly width: null | undefined | number;
  readonly height: null | undefined | number;
  readonly scales: number[];
  readonly hash: string;
  readonly name: string;
  readonly type: string;
};
declare function registerAsset(asset: PackagerAsset): number;
declare function getAssetByID(assetId: number): PackagerAsset;
export type { PackagerAsset };
declare namespace $f2tExportDefaultRedirect {
  export const $f2tHidden_registerAsset: $TypeOf<typeof registerAsset>;
  export const $f2tHidden_getAssetByID: $TypeOf<typeof getAssetByID>;
}
declare namespace $f2tExportDefault {
  export const registerAsset: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_registerAsset>;
  export type registerAsset = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_registerAsset>;
  export const getAssetByID: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getAssetByID>;
  export type getAssetByID = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getAssetByID>;
}
export default $f2tExportDefault;