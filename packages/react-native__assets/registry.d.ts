export type PackagerAsset = {
  __packager_asset: boolean
  fileSystemLocation: string
  httpServerLocation: string
  width: null | undefined | number
  height: null | undefined | number
  scales: Array<number>
  hash: string
  name: string
  type: string
}

export function registerAsset(asset: PackagerAsset): number
export function getAssetByID(assetId: number): PackagerAsset
