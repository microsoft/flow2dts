interface IA {
  +a: string;
  -b?: ?string;
}

interface IB1 {
  [x: string]: number;
}

interface IB2 {
  [string]: number;
}

interface IC {
  c(): void;
  d(a: string, b: ?number, ...c: Array<number>): boolean;
}

interface ID {
  (): void;
  (a: string, b: ?number, ...c: Array<number>): boolean;
}

interface IE {
  get foo(): string;
}
