import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly showMessage: (message: string, color: Object, backgroundColor: Object) => void;
  readonly hide: () => void;
}
export type { Spec };
declare export default null | undefined | Spec;