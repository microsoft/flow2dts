import { expectType } from "tsd"
import { $TypeOf } from "./index"

declare const ANY: any

// $TypeOf: with a value returns the type of the value
declare const SomeValue: { foo: boolean }
expectType<{ foo: boolean }>(ANY as $TypeOf<typeof SomeValue>)
// $TypeOf: with a class returns the class
declare class SomeClass {}
expectType<SomeClass>(ANY as $TypeOf<typeof SomeClass>)
