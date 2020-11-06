// @flow
declare var DeprecatedImageStylePropTypes: typeof $1;
declare const $1;
declare var DeprecatedTextStylePropTypes: typeof $2;
declare const $2;
declare var DeprecatedViewStylePropTypes: typeof $3;
declare const $3;
declare var invariant: typeof $4;
declare const $4;
declare var ReactPropTypesSecret: string;
declare class StyleSheetValidation {
  validateStyleProp: (prop: string, style: Object, caller: string) => void;
  validateStyle: (name: string, styles: Object) => void;
  addValidStylePropTypes: (stylePropTypes: $FlowFixMe) => void;
}
declare var styleError: (message1: $FlowFixMe, style: $FlowFixMe, caller?: $FlowFixMe, message2?: $FlowFixMe) => void;
declare var allStylePropTypes: $FlowFixMe;
declare const $f2tExportDefault: typeof StyleSheetValidation;
export default $f2tExportDefault;