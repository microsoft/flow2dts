// @flow
declare var AnimatedValue: typeof $1;
declare const $1;
declare type Mapping = {
  [key: string]: Mapping;
} | AnimatedValue;
declare type EventConfig = {
  listener?: null | undefined | Function;
  useNativeDriver: boolean;
};
declare function attachNativeEvent(viewRef: any, eventName: string, argMapping: ReadonlyArray<null | undefined | Mapping>) => {
  detach: () => void;
};
declare class AnimatedEvent {
  __isNative: boolean;
  constructor: (argMapping: ReadonlyArray<null | undefined | Mapping>, config: EventConfig) => void;
  __addListener: (callback: Function) => void;
  __removeListener: (callback: Function) => void;
  __attach: (viewRef: any, eventName: string) => void;
  __detach: (viewTag: any, eventName: string) => void;
  __getHandler: () => any | (...args: any) => void;
}
export type { Mapping };
export type { EventConfig };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  AnimatedEvent: typeof AnimatedEvent;
  attachNativeEvent: typeof attachNativeEvent;
};
export default $f2tExportDefault;