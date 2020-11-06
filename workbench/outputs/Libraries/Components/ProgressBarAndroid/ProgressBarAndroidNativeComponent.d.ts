// @flow
import { ColorValue } from "../../StyleSheet/StyleSheetTypes";
import { ViewProps } from "../View/ViewPropTypes";
import { Double } from "../../Types/CodegenTypes";
import { WithDefault } from "../../Types/CodegenTypes";
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  //Props
  styleAttr?: string;
  typeAttr?: string;
  indeterminate: boolean;
  progress?: WithDefault;
  animating?: WithDefault;
  color?: null | undefined | ColorValue;
  testID?: WithDefault;
}>;
declare export default HostComponent;