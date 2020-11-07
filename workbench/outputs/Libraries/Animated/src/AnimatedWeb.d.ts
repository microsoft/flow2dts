import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var AnimatedImplementation: $TypeOf<typeof $1>;
import $1 from "./AnimatedImplementation";
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
$TypeOf<typeof AnimatedImplementation> & {
  // $FlowFixMe createAnimatedComponent expects to receive types. Plain intrinsic components can't be typed like this
  div: $FlowFixMe;
  // $FlowFixMe createAnimatedComponent expects to receive types. Plain intrinsic components can't be typed like this
  span: $FlowFixMe;
  // $FlowFixMe createAnimatedComponent expects to receive types. Plain intrinsic components can't be typed like this
  img: $FlowFixMe;
};
export default $f2tExportDefault;