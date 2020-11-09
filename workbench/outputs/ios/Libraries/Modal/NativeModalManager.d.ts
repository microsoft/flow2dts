// @flow
import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  // RCTEventEmitter
  readonly addListener: (eventName: string) => void;
  readonly removeListeners: (count: number) => void;
}
export type { Spec };
declare export default null | undefined | Spec;