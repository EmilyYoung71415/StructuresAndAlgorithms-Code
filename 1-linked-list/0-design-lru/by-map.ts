import { type ILRU } from './i-lru';

export class LRUCache<T, U> implements ILRU<T, U> {
  #cache: Map<T, U> = new Map();
  #capacity: number;

  constructor(capacity: number) {
    this.#capacity = capacity;
  }

  get(key: T): U | null {
    if (!this.#cache.has(key)) return null;

    const value = this.#cache.get(key);
    this.#cache.delete(key);
    this.#cache.set(key, value);
    return value;
  }

  put(key: T, value: U): void {
    if (this.#cache.has(key)) {
      this.#cache.delete(key);
    } else if (this.#cache.size >= this.#capacity) {
      const oldestKey = this.#cache.keys().next().value;
      this.#cache.delete(oldestKey);
    }
    this.#cache.set(key, value);
  }
}
