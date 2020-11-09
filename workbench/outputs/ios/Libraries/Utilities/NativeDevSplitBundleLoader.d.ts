// @flow
import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly loadBundle: (bundlePath: string) => Promise<void>;
}
export type { Spec };
declare export default null | undefined | Spec;