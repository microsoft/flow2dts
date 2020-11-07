// @flow
import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  // Common interface
  readonly getInitialURL: () => Promise;
  readonly canOpenURL: (url: string) => Promise;
  readonly openURL: (url: string) => Promise;
  readonly openSettings: () => Promise;
  // Events
  readonly addListener: (eventName: string) => void;
  readonly removeListeners: (count: number) => void;
}
export type { Spec };
declare export default null | undefined | Spec;