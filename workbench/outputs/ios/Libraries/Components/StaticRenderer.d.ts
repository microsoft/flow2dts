import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "react";
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  /**
  * Indicates whether the render function needs to be called again
  */
  shouldUpdate: boolean;

  /**
  * () => renderable
  * A function that returns a renderable component
  */
  render: () => $1.Node;
}>;
declare class StaticRenderer extends $1.Component<Props> {
  shouldComponentUpdate: (nextProps: Props) => boolean;
  render: () => $1.Node;
}
declare const $f2tExportDefault: $TypeOf<typeof StaticRenderer>;
export default $f2tExportDefault;