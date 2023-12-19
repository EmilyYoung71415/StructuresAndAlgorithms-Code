export interface ILRU<T, U> {
  get(key: T): U | null;
  put(key: T, value: U): void;
}
