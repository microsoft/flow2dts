import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare class Batchinator {
  constructor: (callback: () => void, delayMS: number) => void;

  /*
   * Cleanup any pending tasks.
   *
   * By default, if there is a pending task the callback is run immediately. Set the option abort to
   * true to not call the callback if it was pending.
   */
  dispose: (options?: {
    abort: boolean;
  }) => void;
  schedule: () => void;
}
declare const $f2tExportDefault: $TypeOf<typeof Batchinator>;
export default $f2tExportDefault;