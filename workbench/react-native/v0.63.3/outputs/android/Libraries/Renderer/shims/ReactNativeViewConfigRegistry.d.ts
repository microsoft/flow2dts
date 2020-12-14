// @flow
import { ReactNativeBaseComponentViewConfig } from "./ReactNativeTypes";
import { ViewConfigGetter } from "./ReactNativeTypes";
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
declare const $f2t_get: (name: string) => ReactNativeBaseComponentViewConfig;
declare const $f2t_register: (name: string, callback: ViewConfigGetter) => string;
declare const $f2t_customDirectEventTypes: typeof customDirectEventTypes;
declare const $f2t_customBubblingEventTypes: typeof customBubblingEventTypes;
export { $f2t_get as get, $f2t_register as register, $f2t_customDirectEventTypes as customDirectEventTypes, $f2t_customBubblingEventTypes as customBubblingEventTypes };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  get: (name: string) => ReactNativeBaseComponentViewConfig;
  register: (name: string, callback: ViewConfigGetter) => string;
  customDirectEventTypes: typeof customDirectEventTypes;
  customBubblingEventTypes: typeof customBubblingEventTypes;
};
export default $f2tExportDefault;