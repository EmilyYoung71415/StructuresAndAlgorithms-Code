import { ListNode } from '@utils';

export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let p = head;

  for (let i = 0; i < k; i++) {
    if (p === null) {
      return head;
    }
    p = p.next;
  }

  // p指向k个一组的 head前面的
  let prev = reverseKGroup(p, k);

  for (let i = 0; i < k; i++) {
    p = head.next;
    head.next = prev;
    prev = head;
    head = p;
  }

  return prev;
}
