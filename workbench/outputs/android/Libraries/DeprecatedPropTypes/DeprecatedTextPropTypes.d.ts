import { $TypeOf, React$PropType$Primitive } from "flow2dts-flow-types-polyfill";
import $1 from "./DeprecatedColorPropType";
import $2 from "./DeprecatedEdgeInsetsPropType";
import $3 from "prop-types";
declare var stylePropType: ReactPropsCheckType;
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
  numberOfLines: $3.number;

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
  onLayout: $3.func;

  /**
   * This function is called on press.
   *
   * See https://reactnative.dev/docs/text.html#onpress
   */
  onPress: $3.func;

  /**
   * This function is called on long press.
   *
   * See https://reactnative.dev/docs/text.html#onlongpress
   */
  onLongPress: $3.func;

  /**
   * Defines how far your touch may move off of the button, before
   * deactivating the button.
   *
   * See https://reactnative.dev/docs/text.html#pressretentionoffset
   */
  pressRetentionOffset: typeof $2;

  /**
   * Lets the user select text.
   *
   * See https://reactnative.dev/docs/text.html#selectable
   */
  selectable: $3.bool;

  /**
   * The highlight color of the text.
   *
   * See https://reactnative.dev/docs/text.html#selectioncolor
   */
  selectionColor: typeof $1;

  /**
   * When `true`, no visual change is made when text is pressed down.
   *
   * See https://reactnative.dev/docs/text.html#supperhighlighting
   */
  suppressHighlighting: $3.bool;
  style: $TypeOf<typeof stylePropType>;

  /**
   * Used to locate this view in end-to-end tests.
   *
   * See https://reactnative.dev/docs/text.html#testid
   */
  testID: $3.string;

  /**
   * Used to locate this view from native code.
   *
   * See https://reactnative.dev/docs/text.html#nativeid
   */
  nativeID: $3.string;

  /**
   * Whether fonts should scale to respect Text Size accessibility settings.
   *
   * See https://reactnative.dev/docs/text.html#allowfontscaling
   */
  allowFontScaling: $3.bool;

  /**
   * Specifies largest possible scale a font can reach when `allowFontScaling` is enabled.
   * Possible values:
   * `null/undefined` (default): inherit from the parent node or the global default (0)
   * `0`: no max, ignore parent/global default
   * `>= 1`: sets the maxFontSizeMultiplier of this node to this value
   */
  maxFontSizeMultiplier: $3.number;

  /**
   * Indicates whether the view is an accessibility element.
   *
   * See https://reactnative.dev/docs/text.html#accessible
   */
  accessible: $3.bool;

  /**
   * Whether font should be scaled down automatically.
   *
   * See https://reactnative.dev/docs/text.html#adjustsfontsizetofit
   */
  adjustsFontSizeToFit: $3.bool;

  /**
   * Smallest possible scale a font can reach.
   *
   * See https://reactnative.dev/docs/text.html#minimumfontscale
   */
  minimumFontScale: $3.number;

  /**
   * Specifies the disabled state of the text view for testing purposes.
   *
   * See https://reactnative.dev/docs/text.html#disabled
   */
  disabled: $3.bool;

  /**
   * Determines the types of data converted to clickable URLs in text.
   *
   * See https://reactnative.dev/docs/text.html#dataDetectorType
   */
  dataDetectorType: React$PropType$Primitive<"phoneNumber" | "link" | "email" | "none" | "all">;
};
export default $f2tExportDefault;