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
  share(content: Content, options?: Options): Promise<{
    action: string;
    activityType: null | undefined | string;
  }>;
  sharedAction: "sharedAction";
  dismissedAction: "dismissedAction";
}
export default Share;