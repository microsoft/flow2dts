declare type a = {
  x: () => void;
  y?: (x: string, y?: number, ...z: number[]) => boolean;
}
