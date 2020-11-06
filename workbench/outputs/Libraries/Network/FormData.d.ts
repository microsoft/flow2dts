declare type FormDataValue = any;
declare type Headers = {
  [name: string]: string;
};
declare type FormDataPart = {
  string: string;
  headers: Headers;
} | {
  uri: string;
  headers: Headers;
  name?: string;
  type?: string;
};
declare class FormData {
  constructor: () => void;
  append: (key: string, value: FormDataValue) => void;
  getParts: () => FormDataPart[];
}
declare const $f2tExportDefault: typeof FormData;
export default $f2tExportDefault;