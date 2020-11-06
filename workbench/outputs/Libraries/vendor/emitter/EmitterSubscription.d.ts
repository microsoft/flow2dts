// @flow
declare var EventSubscription: typeof $2;
declare const $2;
import EventEmitter from "./EventEmitter";
import EventSubscriptionVendor from "./EventSubscriptionVendor";
declare class EmitterSubscription extends $1 {
  emitter: EventEmitter;
  listener: Function;
  context: null | undefined | Object;

  /**
   * @param {EventEmitter} emitter - The event emitter that registered this
   *   subscription
   * @param {EventSubscriptionVendor} subscriber - The subscriber that controls
   *   this subscription
   * @param {function} listener - Function to invoke when the specified event is
   *   emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */
  constructor: (emitter: EventEmitter, subscriber: EventSubscriptionVendor, listener: Function, context: null | undefined | Object) => void;

  /**
   * Removes this subscription from the emitter that registered it.
   * Note: we're overriding the `remove()` method of EventSubscription here
   * but deliberately not calling `super.remove()` as the responsibility
   * for removing the subscription lies with the EventEmitter.
   */
  remove: () => void;
}
declare var $1: typeof EventSubscription;
declare const $f2tExportDefault: EmitterSubscription;
export default $f2tExportDefault;