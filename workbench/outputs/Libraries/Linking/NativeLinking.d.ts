import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly getInitialURL: () => Promise;
  readonly canOpenURL: (url: string) => Promise;
  readonly openURL: (url: string) => Promise;
  readonly openSettings: () => Promise;
  readonly sendIntent: (action: string, extras: null | undefined | {
    key: string;
    value: string | number | boolean;
  }[]) => Promise;
  readonly addListener: (eventName: string) => void;
  readonly removeListeners: (count: number) => void;
}
export type { Spec };
declare export default Spec;