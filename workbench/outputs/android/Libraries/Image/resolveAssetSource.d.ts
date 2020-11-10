import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./AssetSourceResolver";
import { ResolvedAssetSource } from "./AssetSourceResolver";
declare function setCustomSourceTransformer(transformer: (resolver: $1) => ResolvedAssetSource): void;
declare function resolveAssetSource(source: any): null | undefined | ResolvedAssetSource;
declare const $f2tExportDefault: $TEMPORARY$module$exports$assign<$TypeOf<typeof resolveAssetSource>, {
  setCustomSourceTransformer: $TypeOf<typeof setCustomSourceTransformer>;
  pickScale: $1;
}>;
export default $f2tExportDefault;