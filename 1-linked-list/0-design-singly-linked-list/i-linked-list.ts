export type NodeVal = number | string;

export interface ILinkedList<T extends NodeVal> {
  add(val: T): void;
  get(index: number): T | null;
  getValues(): T[];
  insertAt(val: T, index: number): void;
  removeAt(index: number): boolean;
}

export class Node<T extends NodeVal> {
  data: T;
  next: Node<T> | null;
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}
