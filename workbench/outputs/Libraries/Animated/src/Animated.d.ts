import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var View: $TypeOf<typeof $3>;
declare const $3;
declare var React: $TypeOf<typeof $2>;
declare const $2;
import { AnimatedComponentType } from "./createAnimatedComponent";
declare var AnimatedMock: $TypeOf<typeof $1>;
declare const $1;
declare var Animated: $TypeOf<typeof AnimatedMock>;
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
$TypeOf<typeof Animated> & {
  FlatList: () => any;
  Image: () => any;
  ScrollView: () => any;
  SectionList: () => any;
  Text: () => any;
  View: () => AnimatedComponentType;
};
export default $f2tExportDefault;