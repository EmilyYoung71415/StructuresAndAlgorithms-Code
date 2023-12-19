import { type ILinkedList, type NodeVal, Node } from './i-linked-list';

export class LinkedList<T extends NodeVal> implements ILinkedList<T> {
  #head: Node<T> | null;

  constructor() {
    this.#head = null;
  }

  add(val: T): void {
    const newNode = new Node(val);
    if (this.#head === null) {
      this.#head = newNode;
      return;
    }
    newNode.next = this.#head;
    this.#head = newNode;
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
    while (cur !== null && i < index - 1) {
      cur = cur.next;
      i++;
    }
    if (cur === null || cur.next === null) {
      return false;
    }
    cur.next = cur.next.next;
    return true;
  }
}
