type Primitive = string | number | boolean | null | undefined | bigint | symbol;

export type DotPaths<T> = T extends Primitive
    ? never
    : {
          [K in Extract<keyof T, string>]: T[K] extends Primitive
              ? K
              : T[K] extends readonly any[]
                ? K
                : K | `${K}.${DotPaths<T[K]>}`;
      }[Extract<keyof T, string>];

export type PathValue<
    T,
    P extends string,
> = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
        ? PathValue<T[K], Rest>
        : never
    : P extends keyof T
      ? T[P]
      : never;
