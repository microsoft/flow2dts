declare function polyfillObjectProperty<T>(object: Object, name: string, getValue: () => T) => void;
declare function polyfillGlobal<T>(name: string, getValue: () => T) => void;
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  polyfillObjectProperty: typeof polyfillObjectProperty;
  polyfillGlobal: typeof polyfillGlobal;
};
export default $f2tExportDefault;