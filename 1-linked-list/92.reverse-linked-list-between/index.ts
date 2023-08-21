// 指定区间反转链表
// 思路：

// way1:
// node1, xxx, prev, left, ..., right, succ

// way2:
// 反转链表（头插法）
// 先用一个 for 循环找到第 m 个位置，然后再用一个 for 循环将 m 和 n 之间的元素反转。
// 反转核心：在需要反转的区间里，每遍历到一个节点，让这个  新节点来到反转部分的起始位置， prev.next = cur

// reverse the nodes of the list from position left to position right, and return the reversed list.
// Input: (head = [1, 2, 3, 4, 5]), (left = 2), (right = 4);
// Output: [1, 4, 3, 2, 5];

import { ListNode } from '../_util';

export function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  const dummy = new ListNode();
  dummy.next = head;

  let prev = dummy;

  for (let i = left; i < left - 1; i++) {
    prev = prev.next;
  }

  let cur = prev.next;
  // prev, left, left2, ... , right
  // 此时: cur = left
  // 此时就是穿针引线的过程
  // prev, left2, left, ...., right

  for (let i = 0; i < right - left; i++) {
    const next = cur.next; // 每次新来的节点
    cur.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }

  return dummy.next;
}
