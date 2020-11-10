declare var AnimatedEvent: typeof $5.AnimatedEvent
declare var attachNativeEvent: typeof $15.attachNativeEvent
declare var $5: typeof $4
declare var $15: typeof $14
const $14 = require("./AnimatedEvent")
const $4 = require("./AnimatedEvent")

function f1(e: AnimatedEvent): attachNativeEvent {}
function f2(e: typeof AnimatedEvent): typeof attachNativeEvent {}

import * as React from "react"

function g(): $1<{ ... }> {}

declare class MyClass1 extends $1<{ ... }> implements $1<{ ... }>, $1<{ ... }> {
  member: $1<{ ... }>;
}

declare interface MyInterface1 extends $1<{ ... }>, $1<{ ... }> {
  member: $1<{ ... }>;
}

class MyClass2 extends $1<{ ... }> implements $1<{ ... }>, $1<{ ... }> {
  member: $1<{ ... }>
}

interface MyInterface2 extends $1<{ ... }>, $1<{ ... }> {
  member: $1<{ ... }>;
}

declare var $1: typeof React.Component

declare var FakeReact: typeof fakeReact
const $fakeReact = require("fake-react")

type something = FakeReact.AbstractComponent<number>
