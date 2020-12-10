type ErrorHandlerCallback = (error: any, isFatal?: boolean) => void

export interface ErrorUtils {
  setGlobalHandler: (callback: ErrorHandlerCallback) => void
  getGlobalHandler: () => ErrorHandlerCallback
}

declare global {
  interface NodeRequire {
    (id: string): any
  }

  var require: NodeRequire

  /**
   * Console polyfill
   * @see https://reactnative.dev/docs/javascript-environment#polyfills
   */
  interface Console {
    error(message?: any, ...optionalParams: any[]): void
    info(message?: any, ...optionalParams: any[]): void
    log(message?: any, ...optionalParams: any[]): void
    warn(message?: any, ...optionalParams: any[]): void
    trace(message?: any, ...optionalParams: any[]): void
    debug(message?: any, ...optionalParams: any[]): void
    table(...data: any[]): void
    groupCollapsed(label?: string): void
    groupEnd(): void
    group(label?: string): void
    /**
     * @deprecated Use LogBox.ignoreAllLogs(disable) instead
     */
    disableYellowBox: boolean
    /**
     * @deprecated Use LogBox.ignoreLogs(patterns) instead
     */
    ignoredYellowBox: string[]
  }

  var console: Console

  /**
   * This contains the non-native `XMLHttpRequest` object, which you can use if you want to route network requests
   * through DevTools (to trace them):
   *
   *   global.XMLHttpRequest = global.originalXMLHttpRequest;
   *
   * @see https://github.com/facebook/react-native/issues/934
   */
  const originalXMLHttpRequest: any

  const __BUNDLE_START_TIME__: number
  const ErrorUtils: ErrorUtils

  /**
   * This variable is set to true when react-native is running in Dev mode
   * Typical usage:
   * <code> if (__DEV__) console.log('Running in dev mode')</code>
   */
  const __DEV__: boolean

  const HermesInternal: null | {}
}
