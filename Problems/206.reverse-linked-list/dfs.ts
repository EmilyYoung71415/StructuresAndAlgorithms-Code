export function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;

  const last = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}
