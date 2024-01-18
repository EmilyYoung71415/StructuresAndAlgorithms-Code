// reverseN -> reverseBetween
// 依次递归拆解，将问题拆解为 以head之后的某节点开始，反转前n个节点
// 反转前n个节点：
//      返回反转之后的新头节点 last
//      将反转的链表链到原链表上
import { ListNode } from '../_util';

export function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number,
): ListNode | null {
  if (left === 1) {
    return reverseN(head, right);
  }

  head.next = reverseBetween(head.next, left - 1, right - 1); // head.next = last
  return head;

  function reverseN(headNode: ListNode | null, n: number): ListNode | null {
    if (n === 1) {
      return headNode;
    }
    const last = reverseN(headNode.next, n - 1);
    const nextNode = headNode.next;
    headNode.next = nextNode.next;
    nextNode.next = headNode;
    return last;
  }
}
