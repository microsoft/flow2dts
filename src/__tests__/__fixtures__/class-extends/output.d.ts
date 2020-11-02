interface IA {
  x: number
}
interface IB extends IA {
  y: number
}

declare class CA {
  x: number
  z: number
}

declare class CB extends CA implements IA, IB {
  y: number
  w: number
}
