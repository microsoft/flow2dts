class CA {
  a: string;
  b: ?string;
  get e(): string { }
  set e(value: string) { }
}

class CB1 {
  constructor() { }
}

class CB2 {
  constructor(a: string, b?: ?number, ...c: Array<number>) { }
}

class CC {
  c() { }
  d(a: string, b?: ?number, ...c: Array<number>): boolean { }
}
