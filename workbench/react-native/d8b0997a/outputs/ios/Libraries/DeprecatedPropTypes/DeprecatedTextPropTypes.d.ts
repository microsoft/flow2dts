import { React$PropType$Primitive, ReactPropsCheckType } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "./DeprecatedEdgeInsetsPropType";
import $3 from "prop-types";
declare var stylePropType: ReactPropsCheckType;
declare const $f2t_ellipsizeMode: React$PropType$Primitive<"head" | "middle" | "tail" | "clip">;
declare const $f2t_numberOfLines: typeof PropTypes.number;
declare const $f2t_textBreakStrategy: React$PropType$Primitive<"simple" | "highQuality" | "balanced">;
declare const $f2t_onLayout: typeof PropTypes.func;
declare const $f2t_onPress: typeof PropTypes.func;
declare const $f2t_onLongPress: typeof PropTypes.func;
declare const $f2t_pressRetentionOffset: typeof DeprecatedEdgeInsetsPropType;
declare const $f2t_selectable: typeof PropTypes.bool;
declare const $f2t_selectionColor: typeof DeprecatedColorPropType;
declare const $f2t_suppressHighlighting: typeof PropTypes.bool;
declare const $f2t_style: typeof stylePropType;
declare const $f2t_testID: typeof PropTypes.string;
declare const $f2t_nativeID: typeof PropTypes.string;
declare const $f2t_allowFontScaling: typeof PropTypes.bool;
declare const $f2t_maxFontSizeMultiplier: typeof PropTypes.number;
declare const $f2t_accessible: typeof PropTypes.bool;
declare const $f2t_adjustsFontSizeToFit: typeof PropTypes.bool;
declare const $f2t_minimumFontScale: typeof PropTypes.number;
declare const $f2t_disabled: typeof PropTypes.bool;
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
  numberOfLines: typeof PropTypes.number;

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
  onLayout: typeof PropTypes.func;

  /**
   * This function is called on press.
   *
   * See https://reactnative.dev/docs/text.html#onpress
   */
  onPress: typeof PropTypes.func;

  /**
   * This function is called on long press.
   *
   * See https://reactnative.dev/docs/text.html#onlongpress
   */
  onLongPress: typeof PropTypes.func;

  /**
   * Defines how far your touch may move off of the button, before
   * deactivating the button.
   *
   * See https://reactnative.dev/docs/text.html#pressretentionoffset
   */
  pressRetentionOffset: typeof DeprecatedEdgeInsetsPropType;

  /**
   * Lets the user select text.
   *
   * See https://reactnative.dev/docs/text.html#selectable
   */
  selectable: typeof PropTypes.bool;

  /**
   * The highlight color of the text.
   *
   * See https://reactnative.dev/docs/text.html#selectioncolor
   */
  selectionColor: typeof DeprecatedColorPropType;

  /**
   * When `true`, no visual change is made when text is pressed down.
   *
   * See https://reactnative.dev/docs/text.html#supperhighlighting
   */
  suppressHighlighting: typeof PropTypes.bool;
  style: typeof stylePropType;

  /**
   * Used to locate this view in end-to-end tests.
   *
   * See https://reactnative.dev/docs/text.html#testid
   */
  testID: typeof PropTypes.string;

  /**
   * Used to locate this view from native code.
   *
   * See https://reactnative.dev/docs/text.html#nativeid
   */
  nativeID: typeof PropTypes.string;

  /**
   * Whether fonts should scale to respect Text Size accessibility settings.
   *
   * See https://reactnative.dev/docs/text.html#allowfontscaling
   */
  allowFontScaling: typeof PropTypes.bool;

  /**
   * Specifies largest possible scale a font can reach when `allowFontScaling` is enabled.
   * Possible values:
   * `null/undefined` (default): inherit from the parent node or the global default (0)
   * `0`: no max, ignore parent/global default
   * `>= 1`: sets the maxFontSizeMultiplier of this node to this value
   */
  maxFontSizeMultiplier: typeof PropTypes.number;

  /**
   * Indicates whether the view is an accessibility element.
   *
   * See https://reactnative.dev/docs/text.html#accessible
   */
  accessible: typeof PropTypes.bool;

  /**
   * Whether font should be scaled down automatically.
   *
   * See https://reactnative.dev/docs/text.html#adjustsfontsizetofit
   */
  adjustsFontSizeToFit: typeof PropTypes.bool;

  /**
   * Smallest possible scale a font can reach.
   *
   * See https://reactnative.dev/docs/text.html#minimumfontscale
   */
  minimumFontScale: typeof PropTypes.number;

  /**
   * Specifies the disabled state of the text view for testing purposes.
   *
   * See https://reactnative.dev/docs/text.html#disabled
   */
  disabled: typeof PropTypes.bool;

  /**
   * Determines the types of data converted to clickable URLs in text.
   *
   * See https://reactnative.dev/docs/text.html#dataDetectorType
   */
  dataDetectorType: React$PropType$Primitive<"phoneNumber" | "link" | "email" | "none" | "all">;
};
export default $f2tExportDefault;