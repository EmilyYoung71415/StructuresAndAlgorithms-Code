import { ListNode } from '@utils';

export function reverseList(head: ListNode | null): ListNode | null {
  const dummyNode = new ListNode();

  let p = head;
  while (p) {
    const temp = p.next;
    p.next = dummyNode.next;
    dummyNode.next = p;
    p = temp;
  }

  return dummyNode.next;
}
