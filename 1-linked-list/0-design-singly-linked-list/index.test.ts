import { LinkedList } from './by-head-insertion';
import { LinkedList as TailLinkedList } from './by-tail-insertion';

// 使用头插法的链表 是逆序的
describe('LinkedList by head insertion', () => {
  it('should add values', () => {
    const list = new LinkedList<number>();
    const arr = [1, 2, 3];
    arr.forEach(val => list.add(val));
    expect(list.getValues()).toEqual([3, 2, 1]);
  });

  it('should get values', () => {
    const list = new LinkedList<number>();
    const arr = [1, 2, 3];
    arr.forEach(val => list.add(val));
    expect(list.get(0)).toBe(3);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(1);
    expect(list.get(3)).toBeNull();
  });

  it('should insert values', () => {
    const list = new LinkedList<number>();
    const arr = [1, 2, 3];
    arr.forEach(val => list.add(val));
    expect(list.getValues()).toEqual([3, 2, 1]);
    list.insertAt(4, 1);
    expect(list.getValues()).toEqual([3, 4, 2, 1]);
  });

  it('should remove values', () => {
    const list = new LinkedList<number>();
    const arr = [1, 2, 3];
    arr.forEach(val => list.add(val));
    expect(list.getValues()).toEqual([3, 2, 1]);
    list.removeAt(1);
    expect(list.getValues()).toEqual([3, 1]);
  });
});

// 使用尾插法的链表 是顺序的，但是尾插法内部需要维护一个 tail 指针，所以需要额外的空间
describe('LinkedList by tail insertion', () => {
  it('should add values', () => {
    const list = new TailLinkedList<number>();
    const arr = [1, 2, 3];
    arr.forEach(val => list.add(val));
    expect(list.getValues()).toEqual(arr);
  });

  it('should get values', () => {
    const list = new TailLinkedList<number>();
    const arr = [1, 2, 3];
    arr.forEach(val => list.add(val));
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
    expect(list.get(3)).toBeNull();
  });

  it('should insert values', () => {
    const list = new TailLinkedList<number>();
    const arr = [1, 2, 3];
    arr.forEach(val => list.add(val));
    expect(list.getValues()).toEqual(arr);
    list.insertAt(4, 1);
    expect(list.getValues()).toEqual([1, 4, 2, 3]);
  });

  it('should remove values', () => {
    const list = new TailLinkedList<number>();
    const arr = [1, 2, 3];
    arr.forEach(val => list.add(val));
    expect(list.getValues()).toEqual(arr);
    list.removeAt(1);
    expect(list.getValues()).toEqual([1, 3]);
  });
});
