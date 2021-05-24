import { $PropertyType } from "utility-types";
import $1 from "react";
import $2 from "react-test-renderer";
import { ReactTestRenderer as ReactTestRendererType } from "react-test-renderer";
declare type ReactTestInstance = $PropertyType<ReactTestRendererType, "root">;
declare type Predicate = (node: ReactTestInstance) => boolean;
declare type $ReturnType<Fn extends (...args: any) => any> = ReturnType<Fn>;
declare type ReactTestRendererJSON = $ReturnType<$ReturnType<typeof import("react-test-renderer")["create"]>["toJSON"]>;
declare function byClickable(): Predicate;
declare function byTestID(testID: string): Predicate;
declare function byTextMatching(regex: RegExp): Predicate;
declare function enter(instance: ReactTestInstance, text: string): void;
declare function maximumDepthError(tree: ReactTestRendererType, maxDepthLimit: number): null | undefined | string;
declare function expectNoConsoleWarn(): void;
declare function expectNoConsoleError(): void;
declare function expectRendersMatchingSnapshot(name: string, ComponentProvider: () => $1.Element<any>, unmockComponent: () => unknown): void;
declare function maximumDepthOfJSON(node?: null | undefined | ReactTestRendererJSON): number;
declare function renderAndEnforceStrictMode(element: $1.Node): any;
declare function renderWithStrictMode(element: $1.Node): ReactTestRendererType;
declare function tap(instance: ReactTestInstance): void;
declare function scrollToBottom(instance: ReactTestInstance): void;
declare function withMessage(fn: Predicate, message: string): Predicate;
export type { ReactTestInstance };
export type { Predicate };
export type { ReactTestRendererJSON };
export { byClickable };
export { byTestID };
export { byTextMatching };
export { enter };
export { expectNoConsoleWarn };
export { expectNoConsoleError };
export { expectRendersMatchingSnapshot };
export { maximumDepthError };
export { maximumDepthOfJSON };
export { renderAndEnforceStrictMode };
export { renderWithStrictMode };
export { scrollToBottom };
export { tap };
export { withMessage };