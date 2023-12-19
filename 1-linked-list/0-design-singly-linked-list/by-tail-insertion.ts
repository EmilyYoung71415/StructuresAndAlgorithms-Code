import { type ILinkedList, type NodeVal, Node } from './i-linked-list';

export class LinkedList<T extends NodeVal> implements ILinkedList<T> {
  #head: Node<T> | null;
  #tail: Node<T> | null;

  constructor() {
    this.#head = null;
    // 每次插入的时候都从尾开始插入，所以需要维护一个 tail 指针 来指向尾部，add的时候更新 tail
    this.#tail = null;
  }

  add(val: T): void {
    const newNode = new Node(val);
    if (this.#head === null) {
      this.#head = newNode;
      this.#tail = newNode;
      return;
    }
    this.#tail!.next = newNode;
    this.#tail = newNode;
  }

  get(index: number): T | null {
    let cur = this.#head;
    let i = 0;
    while (cur !== null && i < index) {
      cur = cur.next;
      i++;
    }
    return cur === null ? null : cur.data;
  }

  getValues(): T[] {
    let cur = this.#head;
    const arr = [];
    while (cur !== null) {
      arr.push(cur.data);
      cur = cur.next;
    }
    return arr;
  }

  insertAt(val: T, index: number): void {
    if (index === 0) {
      this.add(val);
      return;
    }
    let cur = this.#head;
    let i = 0;
    while (cur !== null && i < index - 1) {
      cur = cur.next;
      i++;
    }
    if (cur === null) {
      return;
    }
    const newNode = new Node(val);
    newNode.next = cur.next;
    cur.next = newNode;
  }

  removeAt(index: number): boolean {
    if (this.#head === null) {
      return false;
    }
    if (index === 0) {
      this.#head = this.#head.next;
      return true;
    }
    let cur = this.#head;
    let i = 0;
    while (cur.next !== null && i < index - 1) {
      cur = cur.next;
      i++;
    }
    if (cur.next === null) {
      return false;
    }
    cur.next = cur.next.next;
    return true;
  }
}
