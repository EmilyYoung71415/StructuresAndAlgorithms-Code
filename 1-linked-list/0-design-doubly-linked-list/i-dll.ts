export class DNode<T, U> {
  key: T;
  value: U;
  next: DNode<T, U> | null;
  prev: DNode<T, U> | null;

  constructor(key: T, value: U) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export interface IDoublyLinkedList<T, U> {
  addFirst(node: DNode<T, U>): void;
  removeLast(): DNode<T, U> | null;
  remove(node: DNode<T, U>): void;
  insertAfter(newNode: DNode<T, U>, targetNode: DNode<T, U>): void;
}
