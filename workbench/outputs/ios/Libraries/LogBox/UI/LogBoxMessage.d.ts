import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import { TextStyleProp } from "../../StyleSheet/StyleSheet";
import { Message } from "../Data/parseLogBoxLog";
declare type Props = {
  message: Message;
  style: TextStyleProp;
  plaintext?: null | undefined | boolean;
  maxLength?: null | undefined | number;
};
declare function LogBoxMessage(props: Props): React.Node;
declare export default $TypeOf<typeof LogBoxMessage>;