import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
declare type ContextType = null | undefined | string;
declare var Context: React.Context<ContextType>;
declare export default $TypeOf<typeof Context>;