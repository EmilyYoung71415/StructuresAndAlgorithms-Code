import type { ListNode } from './list-node';

export function headToArr(head: ListNode) {
  const result: number[] = [];

  let p = head;
  while (p) {
    result.push(p.val);
    p = p.next;
  }

  return result;
}

export function expectListAs(head: ListNode, target: number[]) {
  return headToArr(head) === target;
}
