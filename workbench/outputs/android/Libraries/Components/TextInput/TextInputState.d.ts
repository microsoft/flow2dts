import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "react";
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
declare type ComponentRef = $1.ElementRef<HostComponent<unknown>>;
declare function currentlyFocusedInput(): null | undefined | ComponentRef;
declare function currentlyFocusedField(): null | undefined | number;
declare function focusInput(textField: null | undefined | ComponentRef): void;
declare function blurInput(textField: null | undefined | ComponentRef): void;
declare function focusField(textFieldID: null | undefined | number): void;
declare function blurField(textFieldID: null | undefined | number): void;
declare function focusTextInput(textField: null | undefined | ComponentRef): void;
declare function blurTextInput(textField: null | undefined | ComponentRef): void;
declare function registerInput(textField: ComponentRef): void;
declare function unregisterInput(textField: ComponentRef): void;
declare function isTextInput(textField: ComponentRef): boolean;
declare namespace $f2tExportDefaultRedirect {
  export declare const $f2tHidden_currentlyFocusedInput: $TypeOf<typeof currentlyFocusedInput>;
  export declare const $f2tHidden_focusInput: $TypeOf<typeof focusInput>;
  export declare const $f2tHidden_blurInput: $TypeOf<typeof blurInput>;
  export declare const $f2tHidden_currentlyFocusedField: $TypeOf<typeof currentlyFocusedField>;
  export declare const $f2tHidden_focusField: $TypeOf<typeof focusField>;
  export declare const $f2tHidden_blurField: $TypeOf<typeof blurField>;
  export declare const $f2tHidden_focusTextInput: $TypeOf<typeof focusTextInput>;
  export declare const $f2tHidden_blurTextInput: $TypeOf<typeof blurTextInput>;
  export declare const $f2tHidden_registerInput: $TypeOf<typeof registerInput>;
  export declare const $f2tHidden_unregisterInput: $TypeOf<typeof unregisterInput>;
  export declare const $f2tHidden_isTextInput: $TypeOf<typeof isTextInput>;
}
declare namespace $f2tExportDefault {
  export declare const currentlyFocusedInput: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_currentlyFocusedInput>;
  export declare const focusInput: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_focusInput>;
  export declare const blurInput: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_blurInput>;
  export declare const currentlyFocusedField: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_currentlyFocusedField>;
  export declare const focusField: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_focusField>;
  export declare const blurField: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_blurField>;
  export declare const focusTextInput: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_focusTextInput>;
  export declare const blurTextInput: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_blurTextInput>;
  export declare const registerInput: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_registerInput>;
  export declare const unregisterInput: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_unregisterInput>;
  export declare const isTextInput: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_isTextInput>;
}
export default $f2tExportDefault;