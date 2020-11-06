import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly getConstants: () =>
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {};
  readonly getSize: (uri: string) => Promise;
  readonly getSizeWithHeaders: (uri: string, headers: Object) => Promise;
  readonly prefetchImage: (uri: string) => Promise;
  readonly queryCache: (uris: string[]) => Promise;
}
export type { Spec };
declare export default Spec;