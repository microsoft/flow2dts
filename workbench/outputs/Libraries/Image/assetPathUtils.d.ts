import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { PackagerAsset } from "./AssetRegistry";
declare function getAndroidAssetSuffix(scale: number) => string;
declare function getAndroidResourceFolderName(asset: PackagerAsset, scale: number) => string | string;
declare function getAndroidResourceIdentifier(asset: PackagerAsset) => string;
declare function getBasePath(asset: PackagerAsset) => string;
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  getAndroidAssetSuffix: $TypeOf<typeof getAndroidAssetSuffix>;
  getAndroidResourceFolderName: $TypeOf<typeof getAndroidResourceFolderName>;
  getAndroidResourceIdentifier: $TypeOf<typeof getAndroidResourceIdentifier>;
  getBasePath: $TypeOf<typeof getBasePath>;
};
export default $f2tExportDefault;