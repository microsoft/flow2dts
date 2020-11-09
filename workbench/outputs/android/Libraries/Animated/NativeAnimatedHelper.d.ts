import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import NativeEventEmitter from "../EventEmitter/NativeEventEmitter";
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
  getValue: (tag: number, saveValueCallback: (value: number) => void) => void;
  setWaitingForIdentifier: (id: string) => void;
  unsetWaitingForIdentifier: (id: string) => void;
  disableQueue: () => void;
  queueOperation: (fn: () => void) => void;
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
  nodeTag: null | undefined | number;
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
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  API: $TypeOf<typeof API>;
  addWhitelistedStyleProp: $TypeOf<typeof addWhitelistedStyleProp>;
  addWhitelistedTransformProp: $TypeOf<typeof addWhitelistedTransformProp>;
  addWhitelistedInterpolationParam: $TypeOf<typeof addWhitelistedInterpolationParam>;
  validateStyles: $TypeOf<typeof validateStyles>;
  validateTransform: $TypeOf<typeof validateTransform>;
  validateInterpolation: $TypeOf<typeof validateInterpolation>;
  generateNewNodeTag: $TypeOf<typeof generateNewNodeTag>;
  generateNewAnimationId: $TypeOf<typeof generateNewAnimationId>;
  assertNativeAnimatedModule: $TypeOf<typeof assertNativeAnimatedModule>;
  shouldUseNativeDriver: $TypeOf<typeof shouldUseNativeDriver>;
  transformDataType: $TypeOf<typeof transformDataType>;
  nativeEventEmitter: () => NativeEventEmitter;
};
export default $f2tExportDefault;