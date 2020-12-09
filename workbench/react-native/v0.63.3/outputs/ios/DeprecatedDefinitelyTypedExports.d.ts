/**
 * These are types that the current DefinitelyTyped typings exported at the top-level that will be used by many TS
 * applications.
 *
 * TODO: For now they are considered deprecated, but we should discuss if we still want these or move them upstream
 *       so everybody gets to benefit from them. Related, how do Flow users use these now?
 */

// TODO: This shouldn't be necessarty to use here. This is likely needed because of TS React AbstractComponent handling.
import { $TypeOf } from "flow2dts-flow-types-polyfill"

export * from "./DeprecatedLegacyDefinitelyTypedPropsExports"

/**
 * @deprecated Instead use `import("react-native/Libraries/Types/CoreEventTypes").PressEvent`.
 */
export type GestureResponderEvent = import("./Libraries/Types/CoreEventTypes").PressEvent

/**
 * @deprecated Instead use `import("react-native/Libraries/Types/CoreEventTypes").LayoutEvent`.
 */
export type LayoutChangeEvent = import("./Libraries/Types/CoreEventTypes").LayoutEvent

/**
 * @deprecated Instead use `import("react-native/Libraries/Types/CoreEventTypes").ScrollEvent`.
 */
export type NativeScrollEvent = import("./Libraries/Types/CoreEventTypes").ScrollEvent["nativeEvent"]

/**
 * @deprecated Instead use `import("react-native/Libraries/Types/CoreEventTypes").ScrollEvent<T>`.
 */
export type NativeSyntheticEvent<T> = import("./Libraries/Types/CoreEventTypes").SyntheticEvent<T>

/**
 * @deprecated Instead use `import("react-native/Libraries/StyleSheet/StyleSheet").ViewStyle`.
 */
export type ViewStyle = import("./Libraries/StyleSheet/StyleSheet").ViewStyle

/**
 * @deprecated Instead use `import("react-native/Libraries/StyleSheet/StyleSheet").TextStyle`.
 */
export type TextStyle = import("./Libraries/StyleSheet/StyleSheet").TextStyle

/**
 * @deprecated Instead use `import("react-native/Libraries/StyleSheet/StyleSheet").ImageStyle`.
 */
export type ImageStyle = import("./Libraries/StyleSheet/StyleSheet").ImageStyle

/**
 * @deprecated Instead use `import("react-native/Libraries/StyleSheet/StyleSheetTypes").(View|Text|Image)StyleProp`.
 */
export type StyleProp<T> = null | void | T | false | "" | ReadonlyArray<StyleProp<T>>

/**
 * @deprecated Instead use `React.ComponentPropsWithoutRef<typeof Image>`.
 */
export type ImageProps = React.ComponentPropsWithoutRef<$TypeOf<typeof import("./Libraries/Image/Image").default>>

/**
 * @deprecated Instead use `React.ComponentPropsWithoutRef<typeof Text>`.
 */
export type TextProps = React.ComponentPropsWithoutRef<$TypeOf<typeof import("./Libraries/Text/Text").default>>

/**
 * @deprecated Instead use `React.ComponentPropsWithoutRef<typeof TouchableWithoutFeedback>`.
 */
export type TouchableWithoutFeedbackProps = React.ComponentPropsWithoutRef<
  $TypeOf<typeof import("./Libraries/Components/Touchable/TouchableWithoutFeedback").default>
>

/**
 * @deprecated Instead use `React.ComponentPropsWithoutRef<typeof View>`.
 */
export type ViewProps = React.ComponentPropsWithoutRef<
  $TypeOf<typeof import("./Libraries/Components/View/View").default>
>

/**
 * @deprecated Instead use `React.ComponentPropsWithoutRef<typeof TouchableHighlight>`.
 */
export type TouchableHighlightProps = React.ComponentPropsWithoutRef<
  $TypeOf<typeof import("./Libraries/Components/Touchable/TouchableHighlight").default>
>

/**
 * @deprecated Instead use `React.ComponentPropsWithoutRef<typeof TouchableHighlight>`.
 */
export { Props as TextInputProps } from "./Libraries/Components/TextInput/TextInput"

/**
 * @deprecated Instead use `import("react-native/Libraries/Lists/FlatList").Props`.
 */
export type FlatListProps<ItemT> = import("./Libraries/Lists/FlatList").Props<ItemT>

/**
 * @deprecated Instead use `import("reac-native/Libraries/Lists/ViewabilityHelper").ViewToken`.
 */
export { ViewToken } from "./Libraries/Lists/ViewabilityHelper"
