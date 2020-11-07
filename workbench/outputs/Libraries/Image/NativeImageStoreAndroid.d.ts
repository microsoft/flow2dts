// @flow
import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly getConstants: () =>
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {};
  readonly getBase64ForTag: (uri: string, successCallback: (base64ImageData: string) => void, errorCallback: (error: string) => void) => void;
}
export type { Spec };
declare export default Spec;