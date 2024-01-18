/***
 * https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/
 * 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。
 */

function reverseList(head) {
  if (head == null || head.next == null) return haad;

  let newhead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newhead;
}
