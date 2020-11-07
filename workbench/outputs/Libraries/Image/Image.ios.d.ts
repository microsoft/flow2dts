import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var DeprecatedImagePropType: $TypeOf<typeof $1>;
declare const $1;
declare var React: $TypeOf<typeof $2>;
declare const $2;
declare var resolveAssetSource: $TypeOf<typeof $3>;
declare const $3;
import { ImageProps as ImagePropsType } from "./ImageProps";
import ImageViewNativeComponent from "./ImageViewNativeComponent";
declare function getSize(uri: string, success: (width: number, height: number) => void, failure?: (error: any) => void) => void;
declare function getSizeWithHeaders(uri: string, headers: {
  [$f2tKey: string]: string;
}, success: (width: number, height: number) => void, failure?: (error: any) => void) => any;
declare function prefetch(url: string) => any;
declare function queryCache(urls: string[]) => Promise;
declare type ImageComponentStatics = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  getSize: $TypeOf<typeof getSize>;
  getSizeWithHeaders: $TypeOf<typeof getSizeWithHeaders>;
  prefetch: $TypeOf<typeof prefetch>;
  queryCache: $TypeOf<typeof queryCache>;
  resolveAssetSource: $TypeOf<typeof resolveAssetSource>;
  propTypes: $TypeOf<typeof DeprecatedImagePropType>;
}>;
declare const $f2tExportDefault: React.AbstractComponent<ImagePropsType, React.ElementRef<$TypeOf<typeof ImageViewNativeComponent>>> & ImageComponentStatics;
export default $f2tExportDefault;