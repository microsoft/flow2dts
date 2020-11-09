import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import EventSubscriptionVendor from "./_EventSubscriptionVendor";
declare class EventSubscription {
  eventType: string;
  key: number;
  subscriber: EventSubscriptionVendor;

  /**
   * @param {EventSubscriptionVendor} subscriber the subscriber that controls
   *   this subscription.
   */
  constructor: (subscriber: EventSubscriptionVendor) => void;

  /**
   * Removes this subscription from the subscriber that controls it.
   */
  remove: () => void;
}
declare const $f2tExportDefault: $TypeOf<typeof EventSubscription>;
export default $f2tExportDefault;