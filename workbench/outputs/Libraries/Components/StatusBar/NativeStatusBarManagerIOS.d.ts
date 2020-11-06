import { TurboModule } from "../../TurboModule/RCTExport";
interface Spec extends TurboModule {
  readonly getConstants: () =>
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    readonly HEIGHT: number;
    readonly DEFAULT_BACKGROUND_COLOR?: number;
  };
  readonly getHeight: (callback: (result:
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    height: number;
  }) => void) => void;
  readonly setNetworkActivityIndicatorVisible: (visible: boolean) => void;
  readonly addListener: (eventType: string) => void;
  readonly removeListeners: (count: number) => void;
  readonly setStyle: (statusBarStyle?: null | undefined | string, animated: boolean) => void;
  readonly setHidden: (hidden: boolean, withAnimation: string) => void;
}
export type { Spec };
declare export default Spec;