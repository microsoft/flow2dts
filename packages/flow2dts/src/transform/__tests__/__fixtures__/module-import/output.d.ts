import { $TypeOf } from "flow2dts-flow-types-polyfill"
import "x"
import a1 from "a"
import { b1, c1 } from "b"
import d1, { e1, f1 } from "c"
import * as g1 from "d"
import a2$f2tTypeof from "e"
declare type a2 = $TypeOf<typeof a2$f2tTypeof>
import { b2 as B2, c2 as C2 } from "f"
import d2$f2tTypeof from "g"
declare type d2 = $TypeOf<typeof d2$f2tTypeof>
import { e2 as E2, f2 as F2 } from "g"
import a3$f2tTypeof from "h"
declare type a3 = $TypeOf<typeof a3$f2tTypeof>
import { b3 as b3$f2tTypeof, c3 as C3$f2tTypeof } from "i"
declare type b3 = $TypeOf<typeof b3$f2tTypeof>
declare type C3 = $TypeOf<typeof C3$f2tTypeof>
import d3$f2tTypeof, { e3 as e3$f2tTypeof, f3 as F3$f2tTypeof } from "j"
declare type d3 = $TypeOf<typeof d3$f2tTypeof>
declare type e3 = $TypeOf<typeof e3$f2tTypeof>
declare type F3 = $TypeOf<typeof F3$f2tTypeof>
import g from "k"
