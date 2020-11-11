import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import type { Options } from "./DatePickerAndroidTypes";
import type { DatePickerOpenAction } from "./DatePickerAndroidTypes";
declare class DatePickerAndroid {
  open(options: null | undefined | Options): Promise<DatePickerOpenAction>;
  readonly dateSetAction: "dateSetAction";
  readonly dismissedAction: "dismissedAction";
}
declare const $f2tExportDefault: $TypeOf<typeof DatePickerAndroid>;
export default $f2tExportDefault;