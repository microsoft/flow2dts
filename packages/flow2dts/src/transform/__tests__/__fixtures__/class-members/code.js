class CA {
  a: string
  b: ?string
  get e(): string {}
  set e(value: string) {}
}

class CB1 {
  constructor() {}
}

class CB2 {
  constructor(a: string, b?: ?number, ...c: Array<number>) {}
}

class CC {
  c() {}
  d(a: string, b: ?number, ...c: Array<number>): boolean {}
}

class CD<T> {
  static a: string
  static b: T
}

declare class CE {
  constructor(a: string): void;
  foo(b: string): number;
  static a: string;
  static b(): string;
  c: ?string;
}
