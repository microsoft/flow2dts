interface IA {
  x: number;
}

interface IB extends IA {
  y: number;
}

class CA {
  x: number
  z: number
}

class CB extends CA implements IA, IB {
  y: number
  w: number
}
