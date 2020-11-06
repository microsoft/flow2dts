// @flow
import { TurboModule } from "../TurboModule/RCTExport";
declare type PermissionStatus = string;
declare type PermissionType = string;
interface Spec extends TurboModule {
  readonly checkPermission: (permission: PermissionType) => Promise;
  readonly requestPermission: (permission: PermissionType) => Promise;
  readonly shouldShowRequestPermissionRationale: (permission: string) => Promise;
  readonly requestMultiplePermissions: (permissions: PermissionType[]) => Promise;
}
export type { PermissionStatus };
export type { PermissionType };
export type { Spec };
declare export default null | undefined | Spec;