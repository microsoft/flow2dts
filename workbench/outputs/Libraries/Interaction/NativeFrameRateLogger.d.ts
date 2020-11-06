import { TurboModule } from "../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly setGlobalOptions: (options:
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    readonly debug?: null | undefined | boolean;
    readonly reportStackTraces?: null | undefined | boolean;
  }) => void;
  readonly setContext: (context: string) => void;
  readonly beginScroll: () => void;
  readonly endScroll: () => void;
}
export type { Spec };
declare export default null | undefined | Spec;