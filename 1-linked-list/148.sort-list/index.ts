// Input: 4->2->1->3
// Output: 1->2->3->4
// Sort a linked list in O(n log n) time using constant space complexity.
// 那就是快排 或者归排咯

import { ListNode } from '@utils';

// 归排：
// 1. 找到中间点，将链表分为两半 ===> 快慢指针
// 递归，merge(l1, l2);
// merge: 合并两个有序链表

// 空间复杂度需要O(1)的话需要 mergeSort: top-down 优化为 bottom-up
export function sortLinkList(head: ListNode) {
  if (!head || !head.next) return head;

  let slow: ListNode = null;
  let fast: ListNode = null;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  // fast到终点，此时slow.next正好是mid
  const mid = slow.next;
  slow.next = null;

  return merge(sortLinkList(head), sortLinkList(mid));
}

function merge(l1: ListNode, l2: ListNode): ListNode {
  const dummy = new ListNode();
  let tail = dummy.next;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  tail.next = l1 || l2;

  return dummy.next;
}
