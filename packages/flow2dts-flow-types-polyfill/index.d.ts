/**
 * Equivalent of `keyof T`
 * 
 * @see {https://flow.org/en/docs/types/utilities/#toc-keys}
 */
export type $Keys<T> = keyof T;

/**
 * This is not an existing Flow type, but instead a helper to wrap any `typeof` uasge with. TypeScript treats a class
 * as a value and a type, whereas with Flow one has to use the `typeof` operator to get the type. Seeing as we cannot
 * statically know for all identifiers if it represents a class or other value, we have to bridge this at compile time.
 * 
 * @example
 * 
 *   import { $TypeOf } from "flow-builtin-types"
 *   class Foo {}
 *   type Foo$Type = $TypeOf<typeof Foo>
 */
export type $TypeOf<T> = T extends { new(...args: any): any } ? InstanceType<T> : T;

/**
 * TODO: These should be re-enabled as we continue work on flow2dts

// Add types packages
// "dependencies": {
//   "@types/prop-types": "^15.7.3",
//   "@types/react": "^16.9.56"
// },
import PropTypes from "prop-types"
import React from "react"

export type $TEMPORARY$object<T extends object> = T;
export type $TEMPORARY$string<T extends string> = T;
export type $TEMPORARY$array<T extends any[]> = T;

// https://github.com/facebook/flow/blob/master/lib/core.js
type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;
export type $ArrayBufferView = TypedArray | DataView;
export type TimeoutID = number;

// https://github.com/facebook/flow/blob/master/lib/react.js
export type React$Context<T> = React.Context<T>;
// TODO: These should become React.AbstractComponent based
export type React$Node = React.ReactNode;
export type React$Element<T> = React.ElementType<T>;
export type React$Component<P = {}, S = {}> = React.Component<P, S>;
export type React$ComponentType<T> = React.ComponentType<T>;
export type ReactPropsCheckType = (
    props: any,
    propName: string,
    componentName: string,
    href?: string
) => Error | null | undefined;
export type ReactPropsChainableTypeChecker = {
    (props: any, propName: string, componentName: string, href?: string): Error | undefined | null,
    isRequired: ReactPropsCheckType,
};

// TODO: These are actually Flow's utility types
export type $Exact<T extends object> = T;

// TODO: These are actually just RN types
export type $FlowIssue = any;
export type $FlowFixMe = any;
export type $FlowFixMeProps = any;
export type $FlowFixMeState = any;
export type $FlowFixMeEmpty = any;
export type Stringish = string;

// TODO: These are actually prop-types types
export type React$PropType$Primitive<T> = PropTypes.Requireable<T>

type UniqueBranding = { " Thou shalt ignore this here prop or risketh a runtime mad as a bag of ferrets."?: never };
// TESTS:
// This can only be tested when emitting declarations
// const x = { answer: 42 }
// type X = typeof x & UniqueBranding
// export default {
//     get anObject(): X {
//         return x
//     }
// }
*/
