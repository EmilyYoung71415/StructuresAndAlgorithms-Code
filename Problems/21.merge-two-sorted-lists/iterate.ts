import { ListNode } from '@utils';

export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let p = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else {
      // >=
      p.next = l2;
      l2 = l2.next;
    }

    p = p.next;
  }

  // 剩下多余的链表，直接拼接上
  p.next = l1 || l2;

  return dummy.next;
}
