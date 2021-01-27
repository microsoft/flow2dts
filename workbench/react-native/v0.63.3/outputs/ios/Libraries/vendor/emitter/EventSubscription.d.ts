import EventSubscriptionVendor$f2tTypeof from "./EventSubscriptionVendor";
declare type EventSubscriptionVendor = typeof EventSubscriptionVendor$f2tTypeof;
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
declare const $f2tExportDefault: EventSubscription;
export default $f2tExportDefault;