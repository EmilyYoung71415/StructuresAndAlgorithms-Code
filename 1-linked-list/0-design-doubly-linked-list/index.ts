// 双向链表可以在O(1)的时间复杂度内删除链表中的任意节点
// 双向链表可以在O(1)的时间复杂度内完成节点位置的更新
// 与map结合可以实现：在O(1)的时间复杂度内可以通过关键字直接找到对应的节点
import { DNode, type IDoublyLinkedList } from './i-dll';

export class DoublyLinkedList<T, U> implements IDoublyLinkedList<T, U> {
  #head: DNode<T, U> | null;
  #tail: DNode<T, U> | null;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  addFirst(node: DNode<T, U>): void {
    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
    } else {
      node.next = this.#head;
      this.#head.prev = node;
      this.#head = node;
    }
  }

  removeLast(): DNode<T, U> | null {
    if (!this.#tail) return null;
    const tail = this.#tail;
    this.remove(tail);
    return tail;
  }

  remove(node: DNode<T, U>): void {
    if (node === this.#head) {
      this.#head = node.next;
    } else if (node === this.#tail) {
      this.#tail = node.prev;
    } else {
      node.prev!.next = node.next;
      node.next!.prev = node.prev;
    }
  }

  insertAfter(newNode: DNode<T, U>, targetNode: DNode<T, U>): void {
    newNode.prev = targetNode;
    newNode.next = targetNode.next;
    if (targetNode === this.#tail) {
      this.#tail = newNode;
    } else {
      targetNode.next!.prev = newNode;
    }
    targetNode.next = newNode;
  }
}

export { DNode } from './i-dll';
