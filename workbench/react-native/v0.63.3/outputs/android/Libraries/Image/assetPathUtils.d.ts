import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { PackagerAsset } from "./AssetRegistry";
declare function getAndroidAssetSuffix(scale: number): string;
declare function getAndroidResourceFolderName(asset: PackagerAsset, scale: number): string | string;
declare function getAndroidResourceIdentifier(asset: PackagerAsset): string;
declare function getBasePath(asset: PackagerAsset): string;
declare namespace $f2tExportDefaultRedirect {
  export const $f2tHidden_getAndroidAssetSuffix: $TypeOf<typeof getAndroidAssetSuffix>;
  export const $f2tHidden_getAndroidResourceFolderName: $TypeOf<typeof getAndroidResourceFolderName>;
  export const $f2tHidden_getAndroidResourceIdentifier: $TypeOf<typeof getAndroidResourceIdentifier>;
  export const $f2tHidden_getBasePath: $TypeOf<typeof getBasePath>;
}
declare namespace $f2tExportDefault {
  export const getAndroidAssetSuffix: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getAndroidAssetSuffix>;
  export type getAndroidAssetSuffix = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getAndroidAssetSuffix>;
  export const getAndroidResourceFolderName: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getAndroidResourceFolderName>;
  export type getAndroidResourceFolderName = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getAndroidResourceFolderName>;
  export const getAndroidResourceIdentifier: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getAndroidResourceIdentifier>;
  export type getAndroidResourceIdentifier = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getAndroidResourceIdentifier>;
  export const getBasePath: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getBasePath>;
  export type getBasePath = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_getBasePath>;
}
export default $f2tExportDefault;