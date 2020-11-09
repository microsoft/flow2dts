// @flow
import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly readAsDataURL: (data: Object) => Promise<string>;
  readonly readAsText: (data: Object, encoding: string) => Promise<string>;
}
export type { Spec };
declare export default Spec;