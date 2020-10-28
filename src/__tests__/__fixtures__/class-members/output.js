declare class CA {
    a: string;
    b: ?string;
}

declare class CB1 {
    constructor();
}

declare class CB2 {
    constructor(a: string, b?: ?number, ...c: number[]);
}

declare class CC {
    c(): void;
    d(a: string, b?: ?number, ...c: number[]): boolean;
}
