import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly addListener: (eventName: string) => void;
  readonly removeListeners: (count: number) => void;
}
export type { Spec };
declare export default null | undefined | Spec;