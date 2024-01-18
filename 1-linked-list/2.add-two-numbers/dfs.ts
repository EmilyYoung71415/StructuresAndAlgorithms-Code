import { ListNode } from '@utils';

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dfs = (l1: ListNode | null, l2: ListNode | null, carry: 1 | 0 = 0): ListNode | null => {
    if (!l1 && !l2 && carry === 0) return null;

    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;
    const val = sum % 10;
    const nextCarry = Math.floor(sum / 10) as 0 | 1;

    const newNode = new ListNode(val);
    newNode.next = dfs(l1 ? l1.next : null, l2 ? l2.next : null, nextCarry);
    return newNode;
  };

  return dfs(l1, l2, 0);
}
