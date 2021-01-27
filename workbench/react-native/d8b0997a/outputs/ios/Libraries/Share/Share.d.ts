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
  static share(content: Content, options?: Options): Promise<{
    action: string;
    activityType?: null | undefined | string;
  }>;
  static sharedAction: "sharedAction";
  static dismissedAction: "dismissedAction";
}
declare const $f2tExportDefault: Share;
export default $f2tExportDefault;