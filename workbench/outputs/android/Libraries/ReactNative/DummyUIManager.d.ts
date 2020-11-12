import { $FlowFixMe } from "flow2dts-flow-types-polyfill";
// @flow
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  getViewManagerConfig: (viewManagerName: string) => unknown;
  getConstants: () => {};
  getConstantsForViewManager: (viewManagerName: string) => void;
  getDefaultEventTypes: () => $FlowFixMe[];
  lazilyLoadView: (name: string) => void;
  createView: (reactTag: null | undefined | number, viewName: string, rootTag: number, props: Object) => void;
  updateView: (reactTag: number, viewName: string, props: Object) => void;
  focus: (reactTag: null | undefined | number) => void;
  blur: (reactTag: null | undefined | number) => void;
  findSubviewIn: (reactTag: null | undefined | number, point: number[], callback: (nativeViewTag: number, left: number, top: number, width: number, height: number) => void) => void;
  dispatchViewManagerCommand: (reactTag: null | undefined | number, commandID: number, commandArgs: null | undefined | (string | number | boolean)[]) => void;
  measure: (reactTag: null | undefined | number, callback: (left: number, top: number, width: number, height: number, pageX: number, pageY: number) => void) => void;
  measureInWindow: (reactTag: null | undefined | number, callback: (x: number, y: number, width: number, height: number) => void) => void;
  viewIsDescendantOf: (reactTag: null | undefined | number, ancestorReactTag: null | undefined | number, callback: (result: boolean[]) => void) => void;
  measureLayout: (reactTag: null | undefined | number, ancestorReactTag: null | undefined | number, errorCallback: (error: Object) => void, callback: (left: number, top: number, width: number, height: number) => void) => void;
  measureLayoutRelativeToParent: (reactTag: null | undefined | number, errorCallback: (error: Object) => void, callback: (left: number, top: number, width: number, height: number) => void) => void;
  setJSResponder: (reactTag: null | undefined | number, blockNativeResponder: boolean) => void;
  clearJSResponder: () => void;
  configureNextLayoutAnimation: (config: Object, callback: () => void, errorCallback: (error: Object) => void) => void;
  removeSubviewsFromContainerWithID: (containerID: number) => void;
  replaceExistingNonRootView: (reactTag: null | undefined | number, newReactTag: null | undefined | number) => void;
  setChildren: (containerTag: null | undefined | number, reactTags: number[]) => void;
  manageChildren: (containerTag: null | undefined | number, moveFromIndices: number[], moveToIndices: number[], addChildReactTags: number[], addAtIndices: number[], removeAtIndices: number[]) => void;
  // Android only
  setLayoutAnimationEnabledExperimental: (enabled: boolean) => void;
  sendAccessibilityEvent: (reactTag: null | undefined | number, eventType: number) => void;
  showPopupMenu: (reactTag: null | undefined | number, items: string[], error: (error: Object) => void, success: (event: string, selected?: number) => void) => void;
  dismissPopupMenu: () => void;
};
export default $f2tExportDefault;