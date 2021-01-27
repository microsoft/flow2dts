export * from "./AnimatedMock";
import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $3 from "../../Components/View/View";
import $2 from "react";
import { AnimatedComponentType } from "./createAnimatedComponent";
import $1 from "./AnimatedMock";
declare const $f2d_FlatList: any;
declare const $f2d_Image: any;
declare const $f2d_ScrollView: any;
declare const $f2d_SectionList: any;
declare const $f2d_Text: any;
declare const $f2d_View: AnimatedComponentType<$2.ElementConfig<$TypeOf<typeof $3>>, $2.ElementRef<typeof $3>>;
export { $f2d_FlatList as FlatList, $f2d_Image as Image, $f2d_ScrollView as ScrollView, $f2d_SectionList as SectionList, $f2d_Text as Text, $f2d_View as View };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
$TypeOf<typeof $1> & {
  FlatList: any;
  Image: any;
  ScrollView: any;
  SectionList: any;
  Text: any;
  View: AnimatedComponentType<$2.ElementConfig<$TypeOf<typeof $3>>, $2.ElementRef<typeof $3>>;
};
export default $f2tExportDefault;