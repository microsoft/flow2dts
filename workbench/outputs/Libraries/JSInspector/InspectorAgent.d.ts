import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type EventSender = (name: string, params: Object) => void;
declare class InspectorAgent {
  constructor: (eventSender: EventSender) => void;
  sendEvent: (name: string, params: Object) => void;
}
export type { EventSender };
declare const $f2tExportDefault: $TypeOf<typeof InspectorAgent>;
export default $f2tExportDefault;