import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly open: (options: Object) => Promise;
}
export type { Spec };
declare export default Spec;