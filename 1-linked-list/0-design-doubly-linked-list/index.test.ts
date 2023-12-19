import { DoublyLinkedList, DNode } from './index';

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number, string>;

  beforeEach(() => {
    list = new DoublyLinkedList<number, string>();
  });

  it('should add a node at the beginning of the list', () => {
    const node = new DNode(1, 'A');
    list.addFirst(node);
    expect(list.removeLast()).toEqual(node);
  });

  it('should remove a node from the list', () => {
    const node1 = new DNode(1, 'A');
    const node2 = new DNode(2, 'B');
    list.addFirst(node1);
    list.addFirst(node2);
    list.remove(node1);
    expect(list.removeLast()).toEqual(node2);
  });

  it('should insert a node after a target node', () => {
    const node1 = new DNode(1, 'A');
    const node2 = new DNode(2, 'B');
    const node3 = new DNode(3, 'C');
    list.addFirst(node1);
    list.addFirst(node3);
    list.insertAfter(node2, node3);
    expect(list.removeLast()).toEqual(node1);
    expect(list.removeLast()).toEqual(node2);
  });
});
