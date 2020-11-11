// @flow
import type { ViewProps } from "../View/ViewPropTypes";
import type { WithDefault } from "../../Types/CodegenTypes";
import type { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
declare type NativeProps = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  // Props
  emulateUnlessSupported?: WithDefault<boolean, false>;
}>;
declare const $f2tExportDefault: HostComponent<NativeProps>;
export default $f2tExportDefault;