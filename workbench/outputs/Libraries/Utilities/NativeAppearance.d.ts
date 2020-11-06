import { TurboModule } from "../TurboModule/RCTExport";
declare type ColorSchemeName = "light" | "dark";
declare type AppearancePreferences =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  // TODO: (hramos) T52919652 Use ?ColorSchemeName once codegen supports union
  // types.

  /* 'light' | 'dark' */
  colorScheme?: null | undefined | string;
};
interface Spec extends TurboModule {
  readonly getColorScheme: () => null | undefined | string;
  readonly addListener: (eventName: string) => void;
  readonly removeListeners: (count: number) => void;
}
export type { ColorSchemeName };
export type { AppearancePreferences };
export type { Spec };
declare export default null | undefined | Spec;