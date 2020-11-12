import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./nodes/AnimatedValue";
declare type Mapping = {
  [key: string]: Mapping;
} | typeof $1;
declare type EventConfig = {
  listener?: null | undefined | Function;
  useNativeDriver: boolean;
};
declare function attachNativeEvent(viewRef: any, eventName: string, argMapping: ReadonlyArray<null | undefined | Mapping>): {
  detach: () => void;
};
declare class AnimatedEvent {
  __isNative: boolean;
  constructor(argMapping: ReadonlyArray<null | undefined | Mapping>, config: EventConfig);
  __addListener(callback: Function): void;
  __removeListener(callback: Function): void;
  __attach(viewRef: any, eventName: string): void;
  __detach(viewTag: any, eventName: string): void;
  __getHandler(): any | ((...args: any) => void);
}
export type { Mapping };
export type { EventConfig };
declare namespace $f2tExportDefaultRedirect {
  export declare const $f2tHidden_AnimatedEvent: $TypeOf<typeof AnimatedEvent>;
  export declare const $f2tHidden_attachNativeEvent: $TypeOf<typeof attachNativeEvent>;
}
declare namespace $f2tExportDefault {
  export declare const AnimatedEvent: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_AnimatedEvent>;
  export declare const attachNativeEvent: $TypeOf<$f2tExportDefaultRedirect.$f2tHidden_attachNativeEvent>;
}
export default $f2tExportDefault;