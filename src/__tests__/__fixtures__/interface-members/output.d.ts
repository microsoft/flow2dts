interface IA {
    readonly a: string;
    b?: null | undefined | string;
}

interface IB1 {
    [x: string]: number;
}

interface IB2 {
    [$: string]: number;
}

interface IC {
    c(): void;
    d(a: string, b?: null | undefined | number, ...c: number[]): boolean;
}

interface ID {
    (): void;
    (a: string, b?: null | undefined | number, ...c: number[]): boolean;
}
