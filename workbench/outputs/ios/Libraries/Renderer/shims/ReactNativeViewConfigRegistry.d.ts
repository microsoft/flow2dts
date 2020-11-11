import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import type { ReactNativeBaseComponentViewConfig } from "./ReactNativeTypes";
import type { ViewConfigGetter } from "./ReactNativeTypes";
declare var customBubblingEventTypes: {
  [eventName: string]: Readonly<
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    phasedRegistrationNames: Readonly<
    /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
    {
      captured: string;
      bubbled: string;
    }>;
  }>;
};
declare var customDirectEventTypes: {
  [eventName: string]: Readonly<
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    registrationName: string;
  }>;
};
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  get: (name: string) => ReactNativeBaseComponentViewConfig;
  register: (name: string, callback: ViewConfigGetter) => string;
  customDirectEventTypes: $TypeOf<typeof customDirectEventTypes>;
  customBubblingEventTypes: $TypeOf<typeof customBubblingEventTypes>;
};
export default $f2tExportDefault;