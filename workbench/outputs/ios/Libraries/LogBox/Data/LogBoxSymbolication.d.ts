// @flow
import type { StackFrame } from "../../Core/NativeExceptionsManager";
import type { SymbolicatedStackTrace } from "../../Core/Devtools/symbolicateStackTrace";
declare type Stack = StackFrame[];
declare function deleteStack(stack: Stack): void;
declare function symbolicate(stack: Stack): Promise<SymbolicatedStackTrace>;
export type { Stack };
export { deleteStack };
export { symbolicate };