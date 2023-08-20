import { ListNode } from '../_util';

export function mergeTwoSortedLink(l1: ListNode, l2: ListNode) {
  const dummy = new ListNode();
  let tail = dummy;

  while (l1 && l2) {
    if (l1.val < l1.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }

    tail = tail.next;
  }

  // 剩下多余的链表，直接拼接上
  tail.next = l1 || l2;

  return dummy.next;
}
