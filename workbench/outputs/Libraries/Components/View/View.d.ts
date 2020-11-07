import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { ViewProps } from "./ViewPropTypes";
declare var React: $TypeOf<typeof $1>;
import $1 from "react";
import ViewNativeComponent from "./ViewNativeComponent";
declare type Props = ViewProps;
declare var View: React.AbstractComponent<ViewProps, React.ElementRef<$TypeOf<typeof ViewNativeComponent>>>;
export type { Props };
declare const $f2tExportDefault: $TypeOf<typeof View>;
export default $f2tExportDefault;