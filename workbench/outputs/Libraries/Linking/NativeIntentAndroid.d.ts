// @flow
import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly getInitialURL: () => Promise;
  readonly canOpenURL: (url: string) => Promise;
  readonly openURL: (url: string) => Promise;
  readonly openSettings: () => Promise;
  readonly sendIntent: (action: string, extras: null | undefined | {
    key: string;
    value: string | number | boolean; // TODO(T67672788): Union types are not type safe

  }[]) => Promise;
}
export type { Spec };
declare export default null | undefined | Spec;