import PropTypes from "prop-types"

/******************************************************************************
 * React Native types
 *****************************************************************************/

/**
 * @see https://github.com/facebook/react-native/blob/master/flow/Stringish.js
 */
export type Stringish = string

/******************************************************************************
 * Flow types
 *****************************************************************************/

/**
 * @see https://github.com/facebook/flow/blob/41b0eab99cdc5199421f7cccad9e0c4950f8b2f9/tests/any/flowfixme.js
 */
export type $FlowFixMe = any
export type $FlowFixMeProps = any

/**
 * @see https://github.com/facebook/flow/blob/master/lib/core.js
 */
export type $ArrayBufferView = TypedArray | DataView
type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array

/**
 * @see https://github.com/facebook/flow/blob/caf3d8af63b5df37227fd16b22c806966c8596f2/tests/react_proptypes/test.js
 */
export type React$PropType$Primitive<T> = PropTypes.Requireable<T>

/**
 * @see https://github.com/facebook/flow/blob/887103710b5e5ca5c2acc6af8adbf6d79d9cbc7b/lib/react.js#L458-L462
 */
export type ReactPropsCheckType = (
  props: any,
  propName: string,
  componentName: string,
  href?: string
) => Error | null | undefined

/**
 * @see https://github.com/facebook/flow/blob/887103710b5e5ca5c2acc6af8adbf6d79d9cbc7b/lib/react.js#L464-L468
 */
export type ReactPropsChainableTypeChecker = {
  (props: any, propName: string, componentName: string, href?: string): Error | undefined | null
  isRequired: ReactPropsCheckType
}

/**
 * @see https://github.com/facebook/flow/blob/887103710b5e5ca5c2acc6af8adbf6d79d9cbc7b/lib/react.js#L174-L183
 *
 * @todo Check if the React type actually lines up well.
 */
export type React$Element<T> = React.ElementType<T>

/**
 * @see https://github.com/facebook/flow/blob/887103710b5e5ca5c2acc6af8adbf6d79d9cbc7b/lib/react.js#L152-L160
 *
 * @todo The React TS type probably doesn't actually use the concept of `AbstractComponent` yet.
 */
export type React$ComponentType<T> = React.ComponentType<T>

/**
 * @see https://github.com/facebook/flow/blob/887103710b5e5ca5c2acc6af8adbf6d79d9cbc7b/lib/react.js#L201-L215
 *
 * @todo Check if the React type actually lines up well.
 */
export type React$Context<T> = React.Context<T>

/******************************************************************************
 * flow2dts types
 *****************************************************************************/

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
export type $TypeOf<T> = T extends { new (...args: any): any } ? InstanceType<T> : T

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
export type TimeoutID = number;

// https://github.com/facebook/flow/blob/master/lib/react.js
// TODO: These should become React.AbstractComponent based
export type React$Node = React.ReactNode;
export type React$Component<P = {}, S = {}> = React.Component<P, S>;

// TODO: These are actually Flow's utility types
export type $Exact<T extends object> = T;

// TODO: These are actually just RN types
export type $FlowIssue = any;
export type $FlowFixMe = any;
export type $FlowFixMeProps = any;
export type $FlowFixMeState = any;
export type $FlowFixMeEmpty = any;
export type Stringish = string;

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
