import { ListNode } from '@utils';

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummyHead = new ListNode();
  let tail = dummyHead;
  let carry: 1 | 0 = 0;

  while (l1 || l2 || carry !== 0) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;
    const val = sum % 10;
    carry = Math.floor(sum / 10) as 1 | 0; // 两个个位数相加 / 10 = 0 or 1

    const newNode = new ListNode(val);
    // 尾插
    tail.next = newNode;
    tail = tail.next;

    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }

  return dummyHead.next;
}

export function addTwoNumbers2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (!l1 && !l2) return null;
  if (!l1 || !l2) return l1 || l2;

  let p: ListNode | null = l1;
  let q: ListNode | null = l2;

  let flag = false;
  const output: number[] = [];
  while (p && q) {
    const sum = p.val + q.val + (flag ? 1 : 0);
    flag = sum >= 10;
    const val = sum % 10;
    output.push(val);
    p = p.next;
    q = q.next;
  }

  while (p) {
    const sum = p.val + (flag ? 1 : 0);
    flag = sum >= 10;
    const val = sum % 10;
    output.push(val);
    // output.push(p.val);
    p = p.next;
  }

  while (q) {
    const sum = q.val + (flag ? 1 : 0);
    flag = sum >= 10;
    const val = sum % 10;
    output.push(val);
    // output.push(q.val);
    q = q.next;
  }

  // 处理进位扩展为1 形成新高位的情况
  if (flag) {
    output.push(1);
  }

  // 遍历output建立新链表
  const dummyNode = new ListNode();
  let curr = dummyNode;
  // [1,2,3,4,5];
  // 12345
  while (output.length) {
    const val = output.pop();
    const node = new ListNode(val);
    node.next = curr.next;
    curr.next = node;
  }

  return dummyNode.next;
}
