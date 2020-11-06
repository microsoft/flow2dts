// @flow
import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly readAsDataURL: (data: Object) => Promise;
  readonly readAsText: (data: Object, encoding: string) => Promise;
}
export type { Spec };
declare export default Spec;