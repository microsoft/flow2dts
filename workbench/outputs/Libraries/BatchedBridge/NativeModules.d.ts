declare type ModuleConfig = [string, null | undefined | Object
/* constants */
, null | undefined | ReadonlyArray<string>, null | undefined | ReadonlyArray<number>, null | undefined | ReadonlyArray<number>];
declare type MethodType = "async" | "promise" | "sync";
declare var NativeModules: {
  [moduleName: string]: Object;
};
export type { ModuleConfig };
export type { MethodType };
declare const $f2tExportDefault: typeof NativeModules;
export default $f2tExportDefault;