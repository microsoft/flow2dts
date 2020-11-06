declare const NativeEventEmitter;
declare class Linking extends NativeEventEmitter {
  constructor: () => void;

  /**
     * Add a handler to Linking changes by listening to the `url` event type
     * and providing the handler
     *
     * See https://reactnative.dev/docs/linking.html#addeventlistener
     */
  addEventListener: (type: string, handler: Function) => void;

  /**
     * Remove a handler by passing the `url` event type and the handler.
     *
     * See https://reactnative.dev/docs/linking.html#removeeventlistener
     */
  removeEventListener: (type: string, handler: Function) => void;

  /**
     * Try to open the given `url` with any of the installed apps.
     *
     * See https://reactnative.dev/docs/linking.html#openurl
     */
  openURL: (url: string) => Promise;

  /**
     * Determine whether or not an installed app can handle a given URL.
     *
     * See https://reactnative.dev/docs/linking.html#canopenurl
     */
  canOpenURL: (url: string) => Promise;

  /**
     * Open app settings.
     *
     * See https://reactnative.dev/docs/linking.html#opensettings
     */
  openSettings: () => Promise;

  /**
     * If the app launch was triggered by an app link,
     * it will give the link url, otherwise it will give `null`
     *
     * See https://reactnative.dev/docs/linking.html#getinitialurl
     */
  getInitialURL: () => Promise;

  /*
     * Launch an Android intent with extras (optional)
     *
     * @platform android
     *
     * See https://reactnative.dev/docs/linking.html#sendintent
     */
  sendIntent: (action: string, extras?: {
    key: string;
    value: string | number | boolean;
  }[]) => Promise;
}
declare const $f2tExportDefault: Linking;
export default $f2tExportDefault;