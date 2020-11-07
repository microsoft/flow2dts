import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { EventSender } from "./InspectorAgent";
interface Agent {
  constructor: (eventSender: EventSender) => void;
}
declare type AgentClass = Class & {
  DOMAIN: string;
};
declare var JSInspector:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  registerAgent: (type: AgentClass) => void;
  getTimestamp: () => number;
};
declare const $f2tExportDefault: $TypeOf<typeof JSInspector>;
export default $f2tExportDefault;