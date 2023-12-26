export type IPriorityQueueCallbackFunc<T> = (node1: T, node2: T) => boolean;

export interface IPriorityQueue<T> {
  size: number;
  push(node: T): void;
  shift(): T;
  peek(): T;
  isEmpty(): boolean;
}
