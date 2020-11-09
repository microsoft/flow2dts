// @flow
import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly setExtraData: (extraData: Object, forIdentifier: string) => void;
  readonly dismiss: () => void;
}
export type { Spec };
declare export default null | undefined | Spec;