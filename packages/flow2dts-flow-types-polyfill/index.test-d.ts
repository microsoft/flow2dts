import { expectType } from "tsd"
import { $TEMPORARY$module$exports$assign } from "./index"

declare const SomeValue: { foo: boolean }
declare const Exports: $TEMPORARY$module$exports$assign<typeof SomeValue, { bar: number }>
expectType<typeof SomeValue & { bar: number }>(Exports)
