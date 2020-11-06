import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly getConstants: () =>
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {};
  readonly vibrate: (pattern?: null | undefined | number) => void;
  readonly vibrateByPattern: (pattern: number[], repeat: number) => void;
  readonly cancel: () => void;
}
export type { Spec };
declare export default Spec;