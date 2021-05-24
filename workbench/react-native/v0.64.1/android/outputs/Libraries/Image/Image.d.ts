import { React$PropType$Primitive, ReactPropsCheckType } from "flow2dts-flow-types-polyfill";
import $1 from "../DeprecatedPropTypes/DeprecatedViewPropTypes";
import ImageViewNativeComponent from "./ImageViewNativeComponent";
import $2 from "prop-types";
import $3 from "react";
import $5 from "./resolveAssetSource";
import $4 from "./TextInlineImageNativeComponent";
import { ImageProps as ImagePropsType } from "./ImageProps";
declare var ImageProps:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
typeof $1 & {
  style: ReactPropsCheckType;

  /**
   * See https://reactnative.dev/docs/image.html#source
   */
  source: React$PropType$Primitive<{
    headers?: {
      [$f2tKey: string]: string;
    };
    uri?: string;
  } | number | {
    headers?: {
      [$f2tKey: string]: string;
    };
    height?: number;
    uri?: string;
    width?: number;
  }[]>;

  /**
   * blurRadius: the blur radius of the blur filter added to the image
   *
   * See https://reactnative.dev/docs/image.html#blurradius
   */
  blurRadius: typeof $2.number;

  /**
   * See https://reactnative.dev/docs/image.html#defaultsource
   */
  defaultSource: typeof $2.number;

  /**
   * See https://reactnative.dev/docs/image.html#loadingindicatorsource
   */
  loadingIndicatorSource: React$PropType$Primitive<{
    uri?: string;
  } | number>;
  progressiveRenderingEnabled: typeof $2.bool;
  fadeDuration: typeof $2.number;

  /**
   * Analytics Tag used by this Image
   */
  internal_analyticTag: typeof $2.string;

  /**
   * Invoked on load start
   */
  onLoadStart: typeof $2.func;

  /**
   * Invoked on load error
   */
  onError: typeof $2.func;

  /**
   * Invoked when load completes successfully
   */
  onLoad: typeof $2.func;

  /**
   * Invoked when load either succeeds or fails
   */
  onLoadEnd: typeof $2.func;

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID: typeof $2.string;

  /**
   * The mechanism that should be used to resize the image when the image's dimensions
   * differ from the image view's dimensions. Defaults to `auto`.
   *
   * See https://reactnative.dev/docs/image.html#resizemethod
   */
  resizeMethod: React$PropType$Primitive<"auto" | "resize" | "scale">;

  /**
   * Determines how to resize the image when the frame doesn't match the raw
   * image dimensions.
   *
   * See https://reactnative.dev/docs/image.html#resizemode
   */
  resizeMode: React$PropType$Primitive<"cover" | "contain" | "stretch" | "repeat" | "center">;
};
declare function getSize(url: string, success: (width: number, height: number) => void, failure?: (error: any) => void): any;
declare function getSizeWithHeaders(url: string, headers: {
  [$f2tKey: string]: string;
}, success: (width: number, height: number) => void, failure?: (error: any) => void): any;
declare function prefetch(url: string, callback?: null | undefined | Function): any;
declare function abortPrefetch(requestId: number): void;
declare function queryCache(urls: string[]): Promise<{
  [$f2tKey: string]: "memory" | "disk" | "disk/memory";
}>;
declare type ImageComponentStatics = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  getSize: typeof getSize;
  getSizeWithHeaders: typeof getSizeWithHeaders;
  prefetch: typeof prefetch;
  abortPrefetch: typeof abortPrefetch;
  queryCache: typeof queryCache;
  resolveAssetSource: typeof $5;
}>;
declare const $f2tExportDefault: $3.AbstractComponent<ImagePropsType, $3.ElementRef<typeof $4> | $3.ElementRef<typeof ImageViewNativeComponent>> & ImageComponentStatics;
export default $f2tExportDefault;