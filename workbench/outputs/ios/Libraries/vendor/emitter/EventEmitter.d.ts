import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var EventEmitter: $TypeOf<typeof $1>;
import $1 from "./_EventEmitter";
interface EventSubscription {
  remove: () => void;
}
declare export default $TypeOf<typeof EventEmitter>;
export type { EventSubscription };