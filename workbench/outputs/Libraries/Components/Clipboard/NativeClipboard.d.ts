// @flow
import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly getConstants: () =>
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {};
  readonly getString: () => Promise;
  readonly setString: (content: string) => void;
}
export type { Spec };
declare export default Spec;