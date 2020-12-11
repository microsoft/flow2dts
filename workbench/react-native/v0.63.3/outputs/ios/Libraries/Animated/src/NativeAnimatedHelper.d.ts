import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import NativeEventEmitter from "../../EventEmitter/NativeEventEmitter";
import { EventConfig } from "./AnimatedEvent";
import { EventMapping } from "./NativeAnimatedModule";
import { AnimatedNodeConfig } from "./NativeAnimatedModule";
import { AnimatingNodeConfig } from "./NativeAnimatedModule";
import { AnimationConfig } from "./animations/Animation";
import { EndCallback } from "./animations/Animation";
import { InterpolationConfigType } from "./nodes/AnimatedInterpolation";
declare var API:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  enableQueue: () => void;
  disableQueue: () => void;
  createAnimatedNode: (tag: number, config: AnimatedNodeConfig) => void;
  startListeningToAnimatedNodeValue: (tag: number) => void;
  stopListeningToAnimatedNodeValue: (tag: number) => void;
  connectAnimatedNodes: (parentTag: number, childTag: number) => void;
  disconnectAnimatedNodes: (parentTag: number, childTag: number) => void;
  startAnimatingNode: (animationId: number, nodeTag: number, config: AnimatingNodeConfig, endCallback: EndCallback) => void;
  stopAnimation: (animationId: number) => void;
  setAnimatedNodeValue: (nodeTag: number, value: number) => void;
  setAnimatedNodeOffset: (nodeTag: number, offset: number) => void;
  flattenAnimatedNodeOffset: (nodeTag: number) => void;
  extractAnimatedNodeOffset: (nodeTag: number) => void;
  connectAnimatedNodeToView: (nodeTag: number, viewTag: number) => void;
  disconnectAnimatedNodeFromView: (nodeTag: number, viewTag: number) => void;
  restoreDefaultValues: (nodeTag: number) => void;
  dropAnimatedNode: (tag: number) => void;
  addAnimatedEventToView: (viewTag: number, eventName: string, eventMapping: EventMapping) => void;
  removeAnimatedEventFromView: (viewTag: number, eventName: string, animatedNodeTag: number) => void;
};
declare function addWhitelistedStyleProp(prop: string): void;
declare function addWhitelistedTransformProp(prop: string): void;
declare function addWhitelistedInterpolationParam(param: string): void;
declare function validateTransform(configs: ({
  type: "animated";
  property: string;
  nodeTag?: null | undefined | number;
} | {
  type: "static";
  property: string;
  value: number | string;
})[]): void;
declare function validateStyles(styles: {
  [key: string]: null | undefined | number;
}): void;
declare function validateInterpolation(config: InterpolationConfigType): void;
declare function generateNewNodeTag(): number;
declare function generateNewAnimationId(): number;
declare function assertNativeAnimatedModule(): void;
declare function shouldUseNativeDriver(config: (AnimationConfig & {}) | EventConfig): boolean;
declare function transformDataType(value: number | string): number | string;
declare namespace $f2tExportDefaultRedirect {
  export const $f2tHidden_API: $TypeOf<typeof API>;
  export const $f2tHidden_addWhitelistedStyleProp: $TypeOf<typeof addWhitelistedStyleProp>;
  export const $f2tHidden_addWhitelistedTransformProp: $TypeOf<typeof addWhitelistedTransformProp>;
  export const $f2tHidden_addWhitelistedInterpolationParam: $TypeOf<typeof addWhitelistedInterpolationParam>;
  export const $f2tHidden_validateStyles: $TypeOf<typeof validateStyles>;
  export const $f2tHidden_validateTransform: $TypeOf<typeof validateTransform>;
  export const $f2tHidden_validateInterpolation: $TypeOf<typeof validateInterpolation>;
  export const $f2tHidden_generateNewNodeTag: $TypeOf<typeof generateNewNodeTag>;
  export const $f2tHidden_generateNewAnimationId: $TypeOf<typeof generateNewAnimationId>;
  export const $f2tHidden_assertNativeAnimatedModule: $TypeOf<typeof assertNativeAnimatedModule>;
  export const $f2tHidden_shouldUseNativeDriver: $TypeOf<typeof shouldUseNativeDriver>;
  export const $f2tHidden_transformDataType: $TypeOf<typeof transformDataType>;
  export const $f2tHidden_nativeEventEmitter: $TypeOf<typeof NativeEventEmitter>;
}
declare namespace $f2tExportDefault {
  export const API: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_API>;
  export type API = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_API>;
  export const addWhitelistedStyleProp: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_addWhitelistedStyleProp>;
  export type addWhitelistedStyleProp = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_addWhitelistedStyleProp>;
  export const addWhitelistedTransformProp: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_addWhitelistedTransformProp>;
  export type addWhitelistedTransformProp = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_addWhitelistedTransformProp>;
  export const addWhitelistedInterpolationParam: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_addWhitelistedInterpolationParam>;
  export type addWhitelistedInterpolationParam = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_addWhitelistedInterpolationParam>;
  export const validateStyles: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_validateStyles>;
  export type validateStyles = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_validateStyles>;
  export const validateTransform: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_validateTransform>;
  export type validateTransform = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_validateTransform>;
  export const validateInterpolation: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_validateInterpolation>;
  export type validateInterpolation = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_validateInterpolation>;
  export const generateNewNodeTag: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_generateNewNodeTag>;
  export type generateNewNodeTag = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_generateNewNodeTag>;
  export const generateNewAnimationId: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_generateNewAnimationId>;
  export type generateNewAnimationId = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_generateNewAnimationId>;
  export const assertNativeAnimatedModule: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_assertNativeAnimatedModule>;
  export type assertNativeAnimatedModule = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_assertNativeAnimatedModule>;
  export const shouldUseNativeDriver: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_shouldUseNativeDriver>;
  export type shouldUseNativeDriver = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_shouldUseNativeDriver>;
  export const transformDataType: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_transformDataType>;
  export type transformDataType = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_transformDataType>;
  export const nativeEventEmitter: $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_nativeEventEmitter>;
  export type nativeEventEmitter = $TypeOf<typeof $f2tExportDefaultRedirect.$f2tHidden_nativeEventEmitter>;
}
export default $f2tExportDefault;