import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly captureComplete: (path: string, error: null | undefined | string) => void;
}
export type { Spec };
declare export default null | undefined | Spec;