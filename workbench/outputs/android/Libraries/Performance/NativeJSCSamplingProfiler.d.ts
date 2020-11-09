// @flow
import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly operationComplete: (token: number, result: null | undefined | string, error: null | undefined | string) => void;
}
export type { Spec };
declare export default null | undefined | Spec;