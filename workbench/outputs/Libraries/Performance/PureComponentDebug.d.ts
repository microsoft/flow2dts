declare const React;

/*[FLOW2DTS - Warning] This type alias was opaque in the original Flow source.*/
declare type DoNotCommitUsageOfPureComponentDebug = {};
declare class PureComponentDebug<P extends DoNotCommitUsageOfPureComponentDebug, S extends null | undefined | Object = void> extends React.Component<P, S> {
  shouldComponentUpdate: (nextProps: P, nextState: S) => boolean;
}
declare const $f2tExportDefault: typeof PureComponentDebug;
export default $f2tExportDefault;