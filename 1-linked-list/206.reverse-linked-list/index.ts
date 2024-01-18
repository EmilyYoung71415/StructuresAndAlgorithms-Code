// 反转单链表的迭代实现不是一个困难的事情
// 但是递归实现就有点难度了，如果再加一点难度，
// 让你仅仅反转单链表中的一部分，你是否能够递归实现呢？

// Input: head = [1, 2, 3, 4, 5];
// Output: [5, 4, 3, 2, 1];
import { ListNode } from '../_util';

// 原节点head不断遍历，将节点转移到dummyHead新链表里，转移的时候使用的是头插法
// 头插法的意思: newNode总是会插入到 head.next节点上，成为第二个链表节点
// head: 1-2-3-null
// dummy: -1-null

// head: 2-3-null
// dummy: -1-1-null

// head: 3-null
// dummy: -1-2-1-null

// 最后dummy: -1-3-2-1-null, 所以return dummy.next即可
function reverseList2(head: ListNode | null): ListNode | null {
  const dummyHead = new ListNode(-1);

  while (head) {
    const nextNode = head.next;
    // 将head节点插入到dummyHead后面
    // Insert the head node behind the dummyHead
    head.next = dummyHead.next;
    dummyHead.next = head;
    head = nextNode;
  }

  return dummyHead.next;
}

// 如果不新生成一个dummyH的话，就需要自己维护一个始终在头结点的prev
// function reverseList(head: ListNode | null): ListNode | null {}

// 递归写法
function reverseList3(head: ListNode | null) {
  if (head === null || head.next === null) return head;

  // head -> reverseList3(2, 3, 4, null);
  const last = reverseList3(head.next);
  // 1 -> (2<-3<-4...<-9) // last = 9, head=1

  head.next.next = head; // 2-> 1
  head.next = null; // 1-> null

  return last; // 反转后的头节点
}
