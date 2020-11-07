import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare type Content = {
  title?: string;
  message: string;
} | {
  title?: string;
  url: string;
};
declare type Options = {
  dialogTitle?: string;
  excludedActivityTypes?: string[];
  tintColor?: string;
  subject?: string;
};
declare class Share {
  share: (content: Content, options?: Options) => Promise;
  sharedAction: "sharedAction";
  dismissedAction: "dismissedAction";
}
declare const $f2tExportDefault: $TypeOf<typeof Share>;
export default $f2tExportDefault;