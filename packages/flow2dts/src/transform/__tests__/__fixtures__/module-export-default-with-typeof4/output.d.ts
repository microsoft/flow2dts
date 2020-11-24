import { $TypeOf } from "flow2dts-flow-types-polyfill"
interface Spec {}
declare var NativeModule: Spec
declare const $f2tExportDefault: $TypeOf<typeof NativeModule>
export default $f2tExportDefault
