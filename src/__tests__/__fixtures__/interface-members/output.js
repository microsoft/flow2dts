declare interface IA {
    readonly a: string;
    b?: null | undefined | string;
}

declare interface IB1 {
    [x: string]: number;
}

declare interface IB2 {
    [$: string]: number;
}

declare interface IC {
    c(): void;
    d(a: string, b?: null | undefined | number, ...c: number[]): boolean;
}

declare interface ID {
    (): void;
    (a: string, b?: null | undefined | number, ...c: number[]): boolean;
}
