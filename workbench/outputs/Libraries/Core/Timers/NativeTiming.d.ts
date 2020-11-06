import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly createTimer: (callbackID: number, duration: number, jsSchedulingTime: number, repeats: boolean) => void;
  readonly deleteTimer: (timerID: number) => void;
  readonly setSendIdleEvents: (sendIdleEvents: boolean) => void;
}
export type { Spec };
declare export default null | undefined | Spec;