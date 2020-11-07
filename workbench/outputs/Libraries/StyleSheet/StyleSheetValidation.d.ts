import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
declare var DeprecatedImageStylePropTypes: $TypeOf<typeof $1>;
import $1 from "../DeprecatedPropTypes/DeprecatedImageStylePropTypes";
declare var DeprecatedTextStylePropTypes: $TypeOf<typeof $2>;
import $2 from "../DeprecatedPropTypes/DeprecatedTextStylePropTypes";
declare var DeprecatedViewStylePropTypes: $TypeOf<typeof $3>;
import $3 from "../DeprecatedPropTypes/DeprecatedViewStylePropTypes";
declare var invariant: $TypeOf<typeof $4>;
import $4 from "invariant";
declare var ReactPropTypesSecret: string;
declare class StyleSheetValidation {
  validateStyleProp: (prop: string, style: Object, caller: string) => void;
  validateStyle: (name: string, styles: Object) => void;
  addValidStylePropTypes: (stylePropTypes: $FlowFixMe) => void;
}
declare var styleError: (message1: $FlowFixMe, style: $FlowFixMe, caller?: $FlowFixMe, message2?: $FlowFixMe) => void;
declare var allStylePropTypes: $FlowFixMe;
declare const $f2tExportDefault: $TypeOf<typeof StyleSheetValidation>;
export default $f2tExportDefault;