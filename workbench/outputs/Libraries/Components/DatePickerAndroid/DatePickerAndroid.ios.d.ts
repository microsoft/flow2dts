import { Options } from "./DatePickerAndroidTypes";
import { DatePickerOpenAction } from "./DatePickerAndroidTypes";
declare class DatePickerAndroid {
  open: (options: null | undefined | Options) => Promise;
  readonly dateSetAction: "dateSetAction";
  readonly dismissedAction: "dismissedAction";
}
declare const $f2tExportDefault: typeof DatePickerAndroid;
export default $f2tExportDefault;