// @flow
import * as React from "react";
import { ColorValue } from "../../StyleSheet/StyleSheet";
import { ViewStyleProp } from "../../StyleSheet/StyleSheet";
import { DirectEventHandler } from "../../Types/CodegenTypes";
import { MeasureOnSuccessCallback } from "../../Renderer/shims/ReactNativeTypes";
import { MeasureInWindowOnSuccessCallback } from "../../Renderer/shims/ReactNativeTypes";
import { MeasureLayoutOnSuccessCallback } from "../../Renderer/shims/ReactNativeTypes";
declare type DrawerStates = "Idle" | "Dragging" | "Settling";
declare type DrawerSlideEvent = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  offset: number;
}>;
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  /**
  * Determines whether the keyboard gets dismissed in response to a drag.
  *   - 'none' (the default), drags do not dismiss the keyboard.
  *   - 'on-drag', the keyboard is dismissed when a drag begins.
  */
  keyboardDismissMode?: null | undefined | ("none" | "on-drag");

  /**
  * Specifies the background color of the drawer. The default value is white.
  * If you want to set the opacity of the drawer, use rgba. Example:
  *
  * ```
  * return (
  *   <DrawerLayoutAndroid drawerBackgroundColor="rgba(0,0,0,0.5)">
  *   </DrawerLayoutAndroid>
  * );
  * ```
  */
  drawerBackgroundColor: ColorValue;

  /**
  * Specifies the side of the screen from which the drawer will slide in.
  */
  drawerPosition?: null | undefined | ("left" | "right");

  /**
  * Specifies the width of the drawer, more precisely the width of the view that be pulled in
  * from the edge of the window.
  */
  drawerWidth?: null | undefined | number;

  /**
  * Specifies the lock mode of the drawer. The drawer can be locked in 3 states:
  * - unlocked (default), meaning that the drawer will respond (open/close) to touch gestures.
  * - locked-closed, meaning that the drawer will stay closed and not respond to gestures.
  * - locked-open, meaning that the drawer will stay opened and not respond to gestures.
  * The drawer may still be opened and closed programmatically (`openDrawer`/`closeDrawer`).
  */
  drawerLockMode?: null | undefined | ("unlocked" | "locked-closed" | "locked-open");

  /**
  * Function called whenever there is an interaction with the navigation view.
  */
  onDrawerSlide?: null | undefined | DirectEventHandler<DrawerSlideEvent>;

  /**
  * Function called when the drawer state has changed. The drawer can be in 3 states:
  * - Idle, meaning there is no interaction with the navigation view happening at the time
  * - Dragging, meaning there is currently an interaction with the navigation view
  * - Settling, meaning that there was an interaction with the navigation view, and the
  * navigation view is now finishing its closing or opening animation
  */
  onDrawerStateChanged?: null | undefined | ((state: DrawerStates) => unknown);

  /**
  * Function called whenever the navigation view has been opened.
  */
  onDrawerOpen?: null | undefined | (() => unknown);

  /**
  * Function called whenever the navigation view has been closed.
  */
  onDrawerClose?: null | undefined | (() => unknown);

  /**
  * The navigation view that will be rendered to the side of the screen and can be pulled in.
  */
  renderNavigationView: () => React.Element<any>;

  /**
  * Make the drawer take the entire screen and draw the background of the
  * status bar to allow it to open over the status bar. It will only have an
  * effect on API 21+.
  */
  statusBarBackgroundColor?: null | undefined | ColorValue;
  children?: React.Node;
  style?: null | undefined | ViewStyleProp;
}>;
declare type State =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  statusBarBackgroundColor: ColorValue;
};
declare class DrawerLayoutAndroid extends React.Component<Props, State> {
  positions(): unknown;
  static defaultProps:
  /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
  {
    drawerBackgroundColor: "white";
  };
  state: State;
  render(): React.Node;

  /**
   * Opens the drawer.
   */
  openDrawer(): void;

  /**
   * Closes the drawer.
   */
  closeDrawer(): void;

  /**
   * Closing and opening example
   * Note: To access the drawer you have to give it a ref
   *
   * Class component:
   *
   * render () {
   *   this.openDrawer = () => {
   *     this.refs.DRAWER.openDrawer()
   *   }
   *   this.closeDrawer = () => {
   *     this.refs.DRAWER.closeDrawer()
   *   }
   *   return (
   *     <DrawerLayoutAndroid ref={'DRAWER'}>
   *      {children}
   *     </DrawerLayoutAndroid>
   *   )
   * }
   *
   * Function component:
   *
   * const drawerRef = useRef()
   * const openDrawer = () => {
   *   drawerRef.current.openDrawer()
   * }
   * const closeDrawer = () => {
   *   drawerRef.current.closeDrawer()
   * }
   * return (
   *   <DrawerLayoutAndroid ref={drawerRef}>
   *     {children}
   *   </DrawerLayoutAndroid>
   * )
   */

  /**
   * Native methods
   */
  blur(): void;
  focus(): void;
  measure(callback: MeasureOnSuccessCallback): void;
  measureInWindow(callback: MeasureInWindowOnSuccessCallback): void;
  measureLayout(relativeToNativeNode: number, onSuccess: MeasureLayoutOnSuccessCallback, onFail?: () => void): void;
  setNativeProps(nativeProps: Object): void;
}
export default DrawerLayoutAndroid;