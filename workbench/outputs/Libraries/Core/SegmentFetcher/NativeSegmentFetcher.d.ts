import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly fetchSegment: (segmentId: number, options: Object, callback: (error: null | undefined | Object) => void) => void;
  readonly getSegment?: (segmentId: number, options: Object, callback: (error: null | undefined | Object, path: null | undefined | string) => void) => void;
}
export type { Spec };
declare export default Spec;