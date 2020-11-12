import $14 from "./AnimatedEvent"
import $4 from "./AnimatedEvent"
declare function f1(e: $4.AnimatedEvent): $14.attachNativeEvent
declare function f2(e: $4.AnimatedEvent): $14.attachNativeEvent
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
import $fakeReact from "fake-react"
declare type something = $fakeReact.AbstractComponent<number>
declare type otherthing1 = typeof $fakeReact
declare type otherthing2 = typeof React
