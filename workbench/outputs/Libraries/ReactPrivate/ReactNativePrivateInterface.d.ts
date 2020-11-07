import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import BatchedBridge$f2tTypeof from "../BatchedBridge/BatchedBridge";
declare type BatchedBridge = $TypeOf<typeof BatchedBridge$f2tTypeof>;
import ExceptionsManager$f2tTypeof from "../Core/ExceptionsManager";
declare type ExceptionsManager = $TypeOf<typeof ExceptionsManager$f2tTypeof>;
import Platform$f2tTypeof from "../Utilities/Platform";
declare type Platform = $TypeOf<typeof Platform$f2tTypeof>;
import RCTEventEmitter$f2tTypeof from "../EventEmitter/RCTEventEmitter";
declare type RCTEventEmitter = $TypeOf<typeof RCTEventEmitter$f2tTypeof>;
import ReactNativeViewConfigRegistry$f2tTypeof from "../Renderer/shims/ReactNativeViewConfigRegistry";
declare type ReactNativeViewConfigRegistry = $TypeOf<typeof ReactNativeViewConfigRegistry$f2tTypeof>;
import TextInputState$f2tTypeof from "../Components/TextInput/TextInputState";
declare type TextInputState = $TypeOf<typeof TextInputState$f2tTypeof>;
import UIManager$f2tTypeof from "../ReactNative/UIManager";
declare type UIManager = $TypeOf<typeof UIManager$f2tTypeof>;
import deepDiffer$f2tTypeof from "../Utilities/differ/deepDiffer";
declare type deepDiffer = $TypeOf<typeof deepDiffer$f2tTypeof>;
import deepFreezeAndThrowOnMutationInDev$f2tTypeof from "../Utilities/deepFreezeAndThrowOnMutationInDev";
declare type deepFreezeAndThrowOnMutationInDev = $TypeOf<typeof deepFreezeAndThrowOnMutationInDev$f2tTypeof>;
import flattenStyle$f2tTypeof from "../StyleSheet/flattenStyle";
declare type flattenStyle = $TypeOf<typeof flattenStyle$f2tTypeof>;
import ReactFiberErrorDialog$f2tTypeof from "../Core/ReactFiberErrorDialog";
declare type ReactFiberErrorDialog = $TypeOf<typeof ReactFiberErrorDialog$f2tTypeof>;
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  BatchedBridge: () => BatchedBridge;
  ExceptionsManager: () => ExceptionsManager;
  Platform: () => Platform;
  RCTEventEmitter: () => RCTEventEmitter;
  ReactNativeViewConfigRegistry: () => ReactNativeViewConfigRegistry;
  TextInputState: () => TextInputState;
  UIManager: () => UIManager;
  deepDiffer: () => deepDiffer;
  deepFreezeAndThrowOnMutationInDev: () => deepFreezeAndThrowOnMutationInDev;
  flattenStyle: () => flattenStyle;
  ReactFiberErrorDialog: () => ReactFiberErrorDialog;
};
export default $f2tExportDefault;