// @flow
import { WithDefault } from "../../Types/CodegenTypes";
import { ViewProps } from "../View/ViewPropTypes";
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  name?: WithDefault<string, "">;
}>;
declare const $f2tExportDefault: HostComponent<NativeProps>;
export default $f2tExportDefault;