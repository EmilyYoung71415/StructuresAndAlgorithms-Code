import { ListNode } from '@utils';

export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let dummy = new ListNode();
  dummy.next = head;
  let prev = dummy;

  while (true) {
    let last = prev;

    // 判断剩余节点是否还足够k个 没有就返回
    for (let i = 0; i < k; i++) {
      last = last.next;
      if (last === null) {
        return dummy.next;
      }
    }

    // 翻转k个节点
    let cur = prev.next;
    let nextNode: ListNode | null = null;

    for (let i = 0; i < k - 1; i++) {
      nextNode = cur.next;
      cur.next = nextNode.next;
      nextNode.next = prev.next;
      prev.next = nextNode;
    }

    prev = cur;
  }
}
