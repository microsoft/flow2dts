import { $TypeOf } from "flow2dts-flow-types-polyfill"
import $14 from "./AnimatedEvent"
import $4 from "./AnimatedEvent"
declare function f1(e: $4.AnimatedEvent): $14.attachNativeEvent
declare function f2(e: $TypeOf<typeof $4.AnimatedEvent>): $TypeOf<typeof $14.attachNativeEvent>
import * as React from "react"
declare function g(): React.Component<{}>
declare class MyClass1 extends React.Component<{}> implements React.Component<{}>, React.Component<{}> {
  member: React.Component<{}>
}
declare interface MyInterface1 extends React.Component<{}>, React.Component<{}> {
  member: React.Component<{}>
}

declare class MyClass2 extends React.Component<{}> implements React.Component<{}>, React.Component<{}> {
  member: React.Component<{}>
}

interface MyInterface2 extends React.Component<{}>, React.Component<{}> {
  member: React.Component<{}>
}
declare var $2: typeof React.Component
export { $2 }
import $fakeReact from "fake-react"
declare type something = $fakeReact.AbstractComponent<number>
declare type otherthing1 = $TypeOf<typeof $fakeReact>
declare type otherthing2 = $TypeOf<typeof React>
import TS2709_1$f2tTypeof from "TS2709"
declare type TS2709_1 = $TypeOf<typeof TS2709_1$f2tTypeof>
import * as TS2709_2 from "TS2709"
declare type hidden = {
  TS2709_1: TS2709_1
  TS2709_2: $TypeOf<typeof TS2709_2>
}
