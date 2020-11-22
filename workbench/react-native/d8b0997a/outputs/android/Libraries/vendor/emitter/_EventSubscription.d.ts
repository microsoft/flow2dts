import { $TypeOf } from "flow2dts-flow-types-polyfill";
import EventSubscriptionVendor$f2tTypeof from "./_EventSubscriptionVendor";
declare type EventSubscriptionVendor = $TypeOf<typeof EventSubscriptionVendor$f2tTypeof>;
declare class EventSubscription {
  eventType: string;
  key: number;
  subscriber: EventSubscriptionVendor;

  /**
   * @param {EventSubscriptionVendor} subscriber the subscriber that controls
   *   this subscription.
   */
  constructor(subscriber: EventSubscriptionVendor);

  /**
   * Removes this subscription from the subscriber that controls it.
   */
  remove(): void;
}
export default EventSubscription;