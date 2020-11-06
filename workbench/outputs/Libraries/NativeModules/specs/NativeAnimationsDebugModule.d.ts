import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly startRecordingFps: () => void;
  readonly stopRecordingFps: (animationStopTimeMs: number) => void;
}
export type { Spec };
declare export default null | undefined | Spec;