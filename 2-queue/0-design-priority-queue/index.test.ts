import { PriorityQueue } from './index';
import type { IPriorityQueue } from './i-p-queue';

describe('DoublyLinkedList', () => {
  let pq: IPriorityQueue<[number, number]>;

  beforeEach(() => {
    pq = new PriorityQueue<[number, number]>((a, b) => a[0] < b[0]);
  });

  it('push and size should work', () => {
    pq.push([1, 2]);
    pq.push([3, 1]);
    pq.push([2, 3]);
    expect(pq.size).toEqual(3);
  });

  it('shift should work and get proper priority', () => {
    pq.push([3, 1]);
    pq.push([1, 2]);
    pq.push([2, 3]);
    expect(pq.shift()).toEqual([1, 2]);
  });

  it('shift and size should work', () => {
    pq.push([3, 1]);
    pq.push([1, 2]);
    pq.push([2, 3]);
    pq.shift();
    expect(pq.size).toEqual(2);
  });

  it('peek should work', () => {
    pq.push([3, 1]);
    pq.push([1, 2]);
    expect(pq.peek()).toEqual([1, 2]);
    pq.push([0, 3]);
    expect(pq.peek()).toEqual([0, 3]);
  });
});
