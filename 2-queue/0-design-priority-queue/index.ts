import type { IPriorityQueue, IPriorityQueueCallbackFunc } from './i-p-queue';

export * from './i-p-queue';
// 优先队列的排列顺序：优先级越高越在前面
// 优先队列对应堆实现，而堆可以用链表也可以用数组实现，这里用数组实现
// 这样的实现方式是线性On的查找，不是堆的实现，堆的查找替换是基于二分的
export class PriorityQueue<T> implements IPriorityQueue<T> {
  #cb: IPriorityQueueCallbackFunc<T>;
  #arr: T[] = [];

  get size(): number {
    return this.#arr.length;
  }
  constructor(cb: IPriorityQueueCallbackFunc<T>) {
    this.#cb = cb;
    return this;
  }
  push(node: T): void {
    this.#arr.push(node);
    if (this.size > 1) {
      // 最后一个元素是新进的元素/从倒数第二个开始排查 node优先级比
      for (let i = this.size - 2; i >= 0 && this.#cb(node, this.#arr[i]); i--) {
        // 将node放在i上, arr[i+1]放arr[i];
        const temp = this.#arr[i];
        this.#arr[i] = node;
        this.#arr[i + 1] = temp;
      }
    }
  }
  shift(): T {
    return this.#arr.shift();
  }
  peek(): T {
    return this.#arr[0];
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
}
