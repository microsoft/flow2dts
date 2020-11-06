import {expectType} from 'tsd';
import {$Keys, $TypeOf} from "./index"

declare const ANY: any

// $Keys: with a object type
expectType<"foo" | "bar">(ANY as $Keys<{ foo: null, bar: null}>)

// $TypeOf: with a value returns the type of the value
declare const SomeValue: {foo: boolean}
expectType<{foo: boolean}>(ANY as $TypeOf<typeof SomeValue>)
// $TypeOf: with a class returns the class
declare class SomeClass {}
expectType<SomeClass>(ANY as $TypeOf<typeof SomeClass>)
