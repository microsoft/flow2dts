import MyClass$f2tTypeof from "MyClass"
export declare type MyClass = typeof MyClass$f2tTypeof
declare const $f2d_someKey: string
declare const $f2d_anotherKey: () => boolean
export { $f2d_someKey as someKey, $f2d_anotherKey as anotherKey, MyClass$f2tTypeof as MyClass }
declare const $f2tExportDefault: /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  someKey: string
  anotherKey: () => boolean
  MyClass: MyClass
}
export default $f2tExportDefault
