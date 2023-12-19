import { LRUCache } from './by-map';
import { LRUCache as LRUCacheByDList } from './by-map-and-dlinked';

describe('LRUCache', () => {
  it('should store and retrieve values correctly', () => {
    const cache = new LRUCache(3);
    cache.put(1, 'a');
    cache.put(2, 'b');
    cache.put(3, 'c');

    expect(cache.get(1)).toBe('a');
    expect(cache.get(2)).toBe('b');
    expect(cache.get(3)).toBe('c');
  });

  it('should return null for non-existent keys', () => {
    const cache = new LRUCache(3);
    cache.put(1, 'a');
    cache.put(2, 'b');
    cache.put(3, 'c');

    expect(cache.get(4)).toBeNull();
  });

  it('should update the value for existing keys', () => {
    const cache = new LRUCache(3);
    cache.put(1, 'a');
    cache.put(2, 'b');
    cache.put(3, 'c');
    cache.put(2, 'd');

    expect(cache.get(2)).toBe('d');
  });

  it('should evict the least recently used item when the cache is full', () => {
    const cache = new LRUCache(3);
    cache.put(1, 'a');
    cache.put(2, 'b');
    cache.put(3, 'c');
    cache.put(4, 'd');

    expect(cache.get(1)).toBeNull();
    expect(cache.get(2)).toBe('b');
    expect(cache.get(3)).toBe('c');
    expect(cache.get(4)).toBe('d');
  });
});

describe('LRUCache By DList ', () => {
  it('should store and retrieve values correctly', () => {
    const cache = new LRUCacheByDList(3);
    cache.put(1, 'a');
    cache.put(2, 'b');
    cache.put(3, 'c');

    expect(cache.get(1)).toBe('a');
    expect(cache.get(2)).toBe('b');
    expect(cache.get(3)).toBe('c');
  });

  it('should return null for non-existent keys', () => {
    const cache = new LRUCacheByDList(3);
    cache.put(1, 'a');
    cache.put(2, 'b');
    cache.put(3, 'c');

    expect(cache.get(4)).toBeNull();
  });

  it('should update the value for existing keys', () => {
    const cache = new LRUCacheByDList(3);
    cache.put(1, 'a');
    cache.put(2, 'b');
    cache.put(3, 'c');
    cache.put(2, 'd');

    expect(cache.get(2)).toBe('d');
  });

  it('should evict the least recently used item when the cache is full', () => {
    const cache = new LRUCache(3);
    cache.put(1, 'a');
    cache.put(2, 'b');
    cache.put(3, 'c');
    cache.put(4, 'd');

    expect(cache.get(1)).toBeNull();
    expect(cache.get(2)).toBe('b');
    expect(cache.get(3)).toBe('c');
    expect(cache.get(4)).toBe('d');
  });
});
