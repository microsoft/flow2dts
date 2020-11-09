// @flow
import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly open: (options: Object) => Promise<Object>;
}
export type { Spec };
declare export default Spec;