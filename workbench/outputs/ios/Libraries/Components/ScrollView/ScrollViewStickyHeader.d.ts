import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import AnimatedImplementation from "../../Animated/AnimatedImplementation";
import * as React from "react";
import { LayoutEvent } from "../../Types/CoreEventTypes";
declare type Props = {
  children?: React.Element<any>;
  nextHeaderLayoutY: null | undefined | number;
  onLayout: (event: LayoutEvent) => void;
  scrollAnimatedValue: AnimatedImplementation.Value;
  // Will cause sticky headers to stick at the bottom of the ScrollView instead
  // of the top.
  inverted: null | undefined | boolean;
  // The height of the parent ScrollView. Currently only set when inverted.
  scrollViewHeight: null | undefined | number;
  nativeID?: null | undefined | string;
};
declare type State = {
  measured: boolean;
  layoutY: number;
  layoutHeight: number;
  nextHeaderLayoutY: null | undefined | number;
  translateY: null | undefined | number;
};
declare class ScrollViewStickyHeader extends React.Component<Props, State> {
  state: State;
  setNextHeaderY: (y: number) => void;
  UNSAFE_componentWillReceiveProps: (nextProps: Props) => void;
  updateTranslateListener: (translateY: AnimatedImplementation.Interpolation, isFabric: boolean) => void;
  render: () => React.Node;
}
export type { Props };
declare const $f2tExportDefault: $TypeOf<typeof ScrollViewStickyHeader>;
export default $f2tExportDefault;