import type { ListNode } from '@utils';

export function hasCircle(head: ListNode) {
  if (head === null || head.next === null) return false;

  let slow: ListNode = null;
  let fast: ListNode = null;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}
