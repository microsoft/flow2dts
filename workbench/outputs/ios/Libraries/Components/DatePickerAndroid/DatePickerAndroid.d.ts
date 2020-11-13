// @flow
import { Options } from "./DatePickerAndroidTypes";
import { DatePickerOpenAction } from "./DatePickerAndroidTypes";
declare class DatePickerAndroid {
  open(options: null | undefined | Options): Promise<DatePickerOpenAction>;
  readonly dateSetAction: "dateSetAction";
  readonly dismissedAction: "dismissedAction";
}
export default DatePickerAndroid;