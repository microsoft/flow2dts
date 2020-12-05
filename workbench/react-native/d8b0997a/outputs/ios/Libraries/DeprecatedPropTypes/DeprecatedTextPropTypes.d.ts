import { $TypeOf, React$PropType$Primitive, ReactPropsCheckType } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "./DeprecatedEdgeInsetsPropType";
import $3 from "prop-types";
declare var stylePropType: ReactPropsCheckType;
declare const $f2t_ellipsizeMode: React$PropType$Primitive<"head" | "middle" | "tail" | "clip">;
declare const $f2t_numberOfLines: $TypeOf<typeof $3.number>;
declare const $f2t_textBreakStrategy: React$PropType$Primitive<"simple" | "highQuality" | "balanced">;
declare const $f2t_onLayout: $TypeOf<typeof $3.func>;
declare const $f2t_onPress: $TypeOf<typeof $3.func>;
declare const $f2t_onLongPress: $TypeOf<typeof $3.func>;
declare const $f2t_pressRetentionOffset: $TypeOf<typeof $2>;
declare const $f2t_selectable: $TypeOf<typeof $3.bool>;
declare const $f2t_selectionColor: $TypeOf<typeof $1>;
declare const $f2t_suppressHighlighting: $TypeOf<typeof $3.bool>;
declare const $f2t_style: $TypeOf<typeof stylePropType>;
declare const $f2t_testID: $TypeOf<typeof $3.string>;
declare const $f2t_nativeID: $TypeOf<typeof $3.string>;
declare const $f2t_allowFontScaling: $TypeOf<typeof $3.bool>;
declare const $f2t_maxFontSizeMultiplier: $TypeOf<typeof $3.number>;
declare const $f2t_accessible: $TypeOf<typeof $3.bool>;
declare const $f2t_adjustsFontSizeToFit: $TypeOf<typeof $3.bool>;
declare const $f2t_minimumFontScale: $TypeOf<typeof $3.number>;
declare const $f2t_disabled: $TypeOf<typeof $3.bool>;
declare const $f2t_dataDetectorType: React$PropType$Primitive<"phoneNumber" | "link" | "email" | "none" | "all">;
export { $f2t_ellipsizeMode as ellipsizeMode, $f2t_numberOfLines as numberOfLines, $f2t_textBreakStrategy as textBreakStrategy, $f2t_onLayout as onLayout, $f2t_onPress as onPress, $f2t_onLongPress as onLongPress, $f2t_pressRetentionOffset as pressRetentionOffset, $f2t_selectable as selectable, $f2t_selectionColor as selectionColor, $f2t_suppressHighlighting as suppressHighlighting, $f2t_style as style, $f2t_testID as testID, $f2t_nativeID as nativeID, $f2t_allowFontScaling as allowFontScaling, $f2t_maxFontSizeMultiplier as maxFontSizeMultiplier, $f2t_accessible as accessible, $f2t_adjustsFontSizeToFit as adjustsFontSizeToFit, $f2t_minimumFontScale as minimumFontScale, $f2t_disabled as disabled, $f2t_dataDetectorType as dataDetectorType };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  /**
   * When `numberOfLines` is set, this prop defines how text will be
   * truncated.
   *
   * See https://reactnative.dev/docs/text.html#ellipsizemode
   */
  ellipsizeMode: React$PropType$Primitive<"head" | "middle" | "tail" | "clip">;

  /**
   * Used to truncate the text with an ellipsis.
   *
   * See https://reactnative.dev/docs/text.html#numberoflines
   */
  numberOfLines: $TypeOf<typeof $3.number>;

  /**
   * Set text break strategy on Android.
   *
   * See https://reactnative.dev/docs/text.html#textbreakstrategy
   */
  textBreakStrategy: React$PropType$Primitive<"simple" | "highQuality" | "balanced">;

  /**
   * Invoked on mount and layout changes.
   *
   * See https://reactnative.dev/docs/text.html#onlayout
   */
  onLayout: $TypeOf<typeof $3.func>;

  /**
   * This function is called on press.
   *
   * See https://reactnative.dev/docs/text.html#onpress
   */
  onPress: $TypeOf<typeof $3.func>;

  /**
   * This function is called on long press.
   *
   * See https://reactnative.dev/docs/text.html#onlongpress
   */
  onLongPress: $TypeOf<typeof $3.func>;

  /**
   * Defines how far your touch may move off of the button, before
   * deactivating the button.
   *
   * See https://reactnative.dev/docs/text.html#pressretentionoffset
   */
  pressRetentionOffset: $TypeOf<typeof $2>;

  /**
   * Lets the user select text.
   *
   * See https://reactnative.dev/docs/text.html#selectable
   */
  selectable: $TypeOf<typeof $3.bool>;

  /**
   * The highlight color of the text.
   *
   * See https://reactnative.dev/docs/text.html#selectioncolor
   */
  selectionColor: $TypeOf<typeof $1>;

  /**
   * When `true`, no visual change is made when text is pressed down.
   *
   * See https://reactnative.dev/docs/text.html#supperhighlighting
   */
  suppressHighlighting: $TypeOf<typeof $3.bool>;
  style: $TypeOf<typeof stylePropType>;

  /**
   * Used to locate this view in end-to-end tests.
   *
   * See https://reactnative.dev/docs/text.html#testid
   */
  testID: $TypeOf<typeof $3.string>;

  /**
   * Used to locate this view from native code.
   *
   * See https://reactnative.dev/docs/text.html#nativeid
   */
  nativeID: $TypeOf<typeof $3.string>;

  /**
   * Whether fonts should scale to respect Text Size accessibility settings.
   *
   * See https://reactnative.dev/docs/text.html#allowfontscaling
   */
  allowFontScaling: $TypeOf<typeof $3.bool>;

  /**
   * Specifies largest possible scale a font can reach when `allowFontScaling` is enabled.
   * Possible values:
   * `null/undefined` (default): inherit from the parent node or the global default (0)
   * `0`: no max, ignore parent/global default
   * `>= 1`: sets the maxFontSizeMultiplier of this node to this value
   */
  maxFontSizeMultiplier: $TypeOf<typeof $3.number>;

  /**
   * Indicates whether the view is an accessibility element.
   *
   * See https://reactnative.dev/docs/text.html#accessible
   */
  accessible: $TypeOf<typeof $3.bool>;

  /**
   * Whether font should be scaled down automatically.
   *
   * See https://reactnative.dev/docs/text.html#adjustsfontsizetofit
   */
  adjustsFontSizeToFit: $TypeOf<typeof $3.bool>;

  /**
   * Smallest possible scale a font can reach.
   *
   * See https://reactnative.dev/docs/text.html#minimumfontscale
   */
  minimumFontScale: $TypeOf<typeof $3.number>;

  /**
   * Specifies the disabled state of the text view for testing purposes.
   *
   * See https://reactnative.dev/docs/text.html#disabled
   */
  disabled: $TypeOf<typeof $3.bool>;

  /**
   * Determines the types of data converted to clickable URLs in text.
   *
   * See https://reactnative.dev/docs/text.html#dataDetectorType
   */
  dataDetectorType: React$PropType$Primitive<"phoneNumber" | "link" | "email" | "none" | "all">;
};
export default $f2tExportDefault;