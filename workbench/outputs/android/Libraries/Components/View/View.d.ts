import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { ViewProps } from "./ViewPropTypes";
import $1 from "react";
import ViewNativeComponent from "./ViewNativeComponent";
declare type Props = ViewProps;
declare var View: $1<ViewProps, $1<$TypeOf<typeof ViewNativeComponent>>>;
export type { Props };
declare const $f2tExportDefault: $TypeOf<typeof View>;
export default $f2tExportDefault;