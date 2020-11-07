import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { enable as enable$f2tTypeof } from "promise/setimmediate/rejection-tracking";
declare type enable = $TypeOf<typeof enable$f2tTypeof>;
declare type ExtractOptionsType = <P>($f2t1: (options?: null | undefined | P) => void) => P;
declare var rejectionTrackingOptions: $Call;
declare export default $TypeOf<typeof rejectionTrackingOptions>;