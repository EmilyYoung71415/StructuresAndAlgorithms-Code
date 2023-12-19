// 维护数据的访问顺序。每当数据被访问时，它会被移动到链表的头部。
// 当需要淘汰数据时，可以从链表的尾部删除最久未被访问的数据。
import { type ILRU } from './i-lru';
import { DNode, DoublyLinkedList } from '../0-design-doubly-linked-list';

export class LRUCache<T, U> implements ILRU<T, U> {
  #capacity: number;
  #cache: Map<T, DNode<T, U>>;
  #dll: DoublyLinkedList<T, U>;

  constructor(capacity: number) {
    this.#capacity = capacity;
    this.#cache = new Map();
    this.#dll = new DoublyLinkedList();
  }

  get(key: T): U | null {
    const node = this.#cache.get(key);
    if (!node) return null;
    this.#dll.remove(node);
    this.#dll.addFirst(node);
    return node.value;
  }

  put(key: T, value: U): void {
    const node = this.#cache.get(key);
    if (node) {
      node.value = value;
      this.#dll.remove(node);
      this.#dll.addFirst(node);
    } else {
      if (this.#cache.size === this.#capacity) {
        const tail = this.#dll.removeLast();
        if (tail) this.#cache.delete(tail.key);
      }
      const newNode = new DNode(key, value);
      this.#dll.addFirst(newNode);
      this.#cache.set(key, newNode);
    }
  }
}
