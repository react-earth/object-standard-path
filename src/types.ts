type ExcludeEmptyPath<T> = Exclude<T, ''>;

// Path for any
type AnyPath<T, P extends string> = 0 extends 1 & T ? `${P}${any}` : never;

// Path for array
type ArrayPath<T, P extends string> = T extends Array<infer V>
  ? ExcludeEmptyPath<P> | Path<V, `${P}[${number}]`>
  : never;

// Path for object
type ObjectPath<T, P extends string> = T extends object
  ? keyof T extends infer K
    ? K extends keyof T & string
      ?
          | ExcludeEmptyPath<P>
          | `${Path<T[K], `${P extends '' ? K : `${P}.${K}`}`>}`
      : never
    : never
  : never;

// Path priority any > array > object
export type Path<T, P extends string = ''> = AnyPath<T, P> extends never
  ? ArrayPath<T, P> extends never
    ? ObjectPath<T, P> extends never
      ? P
      : ObjectPath<T, P>
    : ArrayPath<T, P>
  : AnyPath<T, P>;

// Path value for array
type ArrayPathValueInner<T, K, R extends string> = K extends ''
  ? T extends Array<infer V>
    ? R extends ''
      ? V
      : PathValue<V, R>
    : any
  : K extends keyof T
  ? T[K] extends Array<infer V>
    ? R extends ''
      ? V
      : PathValue<V, R>
    : any
  : any;
type ArrayPathValue<
  T,
  P extends string,
> = P extends `${infer K}[${number}].${infer R}`
  ? R extends ''
    ? any
    : ArrayPathValueInner<T, K, R>
  : P extends `${infer K}[${number}]${infer R}`
  ? ArrayPathValueInner<T, K, R>
  : never;

// Path value for object
type ObjectPathValueInner<T, K, R extends string = ''> = K extends keyof T
  ? R extends ''
    ? T[K]
    : PathValue<T[K], R>
  : any;
type ObjectPathValue<T, P> = P extends `${infer K}.${infer R}`
  ? R extends ''
    ? any
    : ObjectPathValueInner<T, K, R>
  : P extends `${infer K}`
  ? ObjectPathValueInner<T, K>
  : never;

// Path value priority array > object
export type PathValue<T, P extends string = ''> = ArrayPathValue<
  T,
  P
> extends never
  ? ObjectPathValue<T, P> extends never
    ? any
    : ObjectPathValue<T, P>
  : ArrayPathValue<T, P>;
