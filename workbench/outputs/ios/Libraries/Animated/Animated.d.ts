import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import AnimatedFlatList$f2tTypeof from "./components/AnimatedFlatList";
declare type AnimatedFlatList = $TypeOf<typeof AnimatedFlatList$f2tTypeof>;
import AnimatedImage$f2tTypeof from "./components/AnimatedImage";
declare type AnimatedImage = $TypeOf<typeof AnimatedImage$f2tTypeof>;
import AnimatedScrollView$f2tTypeof from "./components/AnimatedScrollView";
declare type AnimatedScrollView = $TypeOf<typeof AnimatedScrollView$f2tTypeof>;
import AnimatedSectionList$f2tTypeof from "./components/AnimatedSectionList";
declare type AnimatedSectionList = $TypeOf<typeof AnimatedSectionList$f2tTypeof>;
import AnimatedText$f2tTypeof from "./components/AnimatedText";
declare type AnimatedText = $TypeOf<typeof AnimatedText$f2tTypeof>;
import AnimatedView$f2tTypeof from "./components/AnimatedView";
declare type AnimatedView = $TypeOf<typeof AnimatedView$f2tTypeof>;
import $1 from "./AnimatedMock";
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
typeof $1 & {
  FlatList: AnimatedFlatList;
  Image: AnimatedImage;
  ScrollView: AnimatedScrollView;
  SectionList: AnimatedSectionList;
  Text: AnimatedText;
  View: AnimatedView;
};
export default $f2tExportDefault;