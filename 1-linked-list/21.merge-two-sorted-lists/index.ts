import { ListNode } from '../_util';

export function mergeTwoSortedLink(l1: ListNode, l2: ListNode) {
  const dummy = new ListNode();
  let cur = dummy;

  while (l1 && l2) {
    if (l1.val < l1.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }

    cur = cur.next;
  }

  // 剩下多余的链表，直接拼接上
  cur.next = l1 || l2;

  return dummy.next;
}
