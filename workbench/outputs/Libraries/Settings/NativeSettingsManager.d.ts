import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly getConstants: () =>
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    settings: Object;
  };
  readonly setValues: (values: Object) => void;
  readonly deleteValues: (values: string[]) => void;
}
export type { Spec };
declare export default Spec;