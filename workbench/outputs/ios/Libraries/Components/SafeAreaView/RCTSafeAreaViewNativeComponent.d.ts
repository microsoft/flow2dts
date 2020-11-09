// @flow
import { ViewProps } from "../View/ViewPropTypes";
import { WithDefault } from "../../Types/CodegenTypes";
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  // Props
  emulateUnlessSupported?: WithDefault<boolean, false>;
}>;
declare export default HostComponent<NativeProps>;