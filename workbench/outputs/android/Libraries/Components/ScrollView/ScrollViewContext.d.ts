import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
declare type Value = {
  horizontal: boolean;
} | null;
declare var ScrollViewContext: React.Context<Value>;
declare var HORIZONTAL: Value;
declare var VERTICAL: Value;
declare export default $TypeOf<typeof ScrollViewContext>;
export { HORIZONTAL };
export { VERTICAL };