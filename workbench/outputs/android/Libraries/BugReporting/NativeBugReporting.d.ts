// @flow
import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly startReportAProblemFlow: () => void;
  readonly setExtraData: (extraData: Object, extraFiles: Object) => void;
  readonly setCategoryID: (categoryID: string) => void;
}
export type { Spec };
declare export default null | undefined | Spec;