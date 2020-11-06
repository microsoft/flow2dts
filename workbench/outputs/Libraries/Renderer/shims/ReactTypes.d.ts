declare type ReactNode = React$Element | ReactPortal | ReactText | ReactFragment | ReactProvider | ReactConsumer;
declare type ReactEmpty = null | void | boolean;
declare type ReactFragment = ReactEmpty | Iterable;
declare type ReactNodeList = ReactEmpty | React$Node;
declare type ReactText = string | number;
declare type ReactProvider<T> = {
  $$typeof: Symbol | number;
  type: ReactProviderType;
  key: null | string;
  ref: null;
  props: {
    value: T;
    children?: ReactNodeList;
  };
};
declare type ReactProviderType<T> = {
  $$typeof: Symbol | number;
  _context: ReactContext;
};
declare type ReactConsumer<T> = {
  $$typeof: Symbol | number;
  type: ReactContext;
  key: null | string;
  ref: null;
  props: {
    children: (value: T) => ReactNodeList;
    unstable_observedBits?: number;
  };
};
declare type ReactContext<T> = {
  $$typeof: Symbol | number;
  Consumer: ReactContext;
  Provider: ReactProviderType;
  _calculateChangedBits: (a: T, b: T) => number | null;
  _currentValue: T;
  _currentValue2: T;
  _threadCount: number;
  // DEV only
  _currentRenderer?: Object | null;
  _currentRenderer2?: Object | null;
};
declare type ReactPortal = {
  $$typeof: Symbol | number;
  key: null | string;
  containerInfo: any;
  children: ReactNodeList;
  // TODO: figure out the API for cross-renderer implementation.
  implementation: any;
};
declare type RefObject =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  current: any;
};
declare type ReactEventResponderInstance<E, C> =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  fiber: Object;
  props: Object;
  responder: ReactEventResponder;
  rootEventTypes: null | Set;
  state: Object;
};
declare type ReactEventResponderListener<E, C> =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  props: Object;
  responder: ReactEventResponder;
};
declare type ReactEventResponder<E, C> = {
  $$typeof: Symbol | number;
  displayName: string;
  targetEventTypes: null | string[];
  targetPortalPropagation: boolean;
  rootEventTypes: null | string[];
  getInitialState: null | (props: Object) => Object;
  onEvent: null | (event: E, context: C, props: Object, state: Object) => void;
  onRootEvent: null | (event: E, context: C, props: Object, state: Object) => void;
  onMount: null | (context: C, props: Object, state: Object) => void;
  onUnmount: null | (context: C, props: Object, state: Object) => void;
};
declare type EventPriority = 0 | 1 | 2;
declare var DiscreteEvent: EventPriority;
declare var UserBlockingEvent: EventPriority;
declare var ContinuousEvent: EventPriority;
declare type ReactFundamentalComponentInstance<C, H> =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  currentFiber: unknown;
  instance: unknown;
  prevProps: null | Object;
  props: Object;
  impl: ReactFundamentalImpl;
  state: Object;
};
declare type ReactFundamentalImpl<C, H> = {
  displayName: string;
  reconcileChildren: boolean;
  getInitialState?: (props: Object) => Object;
  getInstance: (context: C, props: Object, state: Object) => H;
  getServerSideString?: (context: C, props: Object) => string;
  getServerSideStringClose?: (context: C, props: Object) => string;
  onMount: (context: C, instance: unknown, props: Object, state: Object) => void;
  shouldUpdate?: (context: C, prevProps: null | Object, nextProps: Object, state: Object) => boolean;
  onUpdate?: (context: C, instance: unknown, prevProps: null | Object, nextProps: Object, state: Object) => void;
  onUnmount?: (context: C, instance: unknown, props: Object, state: Object) => void;
  onHydrate?: (context: C, props: Object, state: Object) => boolean;
  onFocus?: (context: C, props: Object, state: Object) => boolean;
};
declare type ReactFundamentalComponent<C, H> =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  $$typeof: Symbol | number;
  impl: ReactFundamentalImpl;
};
declare type ReactScope =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  $$typeof: Symbol | number;
};
declare type ReactScopeQuery = (type: string, props: {
  [$f2tKey: string]: unknown;
}, instance: unknown) => boolean;
declare type ReactScopeMethods =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  DO_NOT_USE_queryAllNodes: ($f2t1: ReactScopeQuery) => null | Object[];
  DO_NOT_USE_queryFirstNode: ($f2t1: ReactScopeQuery) => null | Object;
  containsNode: ($f2t1: Object) => boolean;
  getChildContextValues: <T>(context: ReactContext) => T[];
};
declare type ReactScopeInstance =
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  fiber: Object;
  methods: null | ReactScopeMethods;
};
export type { ReactNode };
export type { ReactEmpty };
export type { ReactFragment };
export type { ReactNodeList };
export type { ReactText };
export type { ReactProvider };
export type { ReactProviderType };
export type { ReactConsumer };
export type { ReactContext };
export type { ReactPortal };
export type { RefObject };
export type { ReactEventResponderInstance };
export type { ReactEventResponderListener };
export type { ReactEventResponder };
export type { EventPriority };
export { DiscreteEvent };
export { UserBlockingEvent };
export { ContinuousEvent };
export type { ReactFundamentalComponentInstance };
export type { ReactFundamentalImpl };
export type { ReactFundamentalComponent };
export type { ReactScope };
export type { ReactScopeQuery };
export type { ReactScopeMethods };
export type { ReactScopeInstance };