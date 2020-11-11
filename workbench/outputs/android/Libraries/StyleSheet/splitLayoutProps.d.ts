import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { DangerouslyImpreciseStyle } from "./StyleSheet";
declare function splitLayoutProps(props: null | undefined | DangerouslyImpreciseStyle): {
  outer: DangerouslyImpreciseStyle;
  inner: DangerouslyImpreciseStyle;
};
declare const $f2tExportDefault: $TypeOf<typeof splitLayoutProps>;
export default $f2tExportDefault;