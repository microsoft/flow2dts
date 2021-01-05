import MyClass$f2tTypeof from "MyClass"
declare type MyClass = typeof MyClass$f2tTypeof
export { MyClass$f2tTypeof as MyClass }
declare const $f2tExportDefault: /*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  someKey: string
  anotherKey: () => boolean
  MyClass: MyClass
}
export default $f2tExportDefault
