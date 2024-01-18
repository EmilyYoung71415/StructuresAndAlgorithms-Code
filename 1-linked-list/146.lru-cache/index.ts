// 一个cache，特点是，存储超限时按 最近访问排序淘汰
export class LRUCache<T> {
  // private _size: number;
  private _cache: Map<number, T> = new Map();

  constructor(private _size: number) {}

  // 每次get的时候都刷新节点，delete再set
  get(key: number): T {
    if (!this._cache.has(key)) return null;

    const value = this._cache.get(key);
    this._cache.delete(key);
    this._cache.set(key, value);
    return value;
  }

  // 每新重复设置也单独设置一下
  // 另外考虑超限时 需删除oldestKey
  put(key: number, value: T): void {
    if (this._cache.has(key)) {
      this._cache.delete(key);
    }

    this._cache.set(key, value);

    if (this._cache.size > this._size) {
      const oldestKey = this._cache.keys().next().value;
      this._cache.delete(oldestKey);
    }
  }
}
