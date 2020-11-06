import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly getConstants: () =>
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    readonly HEIGHT: number;
    readonly DEFAULT_BACKGROUND_COLOR: number;
  };
  readonly setColor: (color: number, animated: boolean) => void;
  readonly setTranslucent: (translucent: boolean) => void;
  readonly setStyle: (statusBarStyle?: null | undefined | string) => void;
  readonly setHidden: (hidden: boolean) => void;
}
export type { Spec };
declare export default Spec;