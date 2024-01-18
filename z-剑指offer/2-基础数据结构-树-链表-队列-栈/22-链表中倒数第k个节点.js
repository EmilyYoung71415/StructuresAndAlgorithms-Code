/***
 * https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
 * 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数
 *
 */

// 给定一个链表: 1->2->3->4->5, 和 k = 2.
// 返回链表 4->5.

/****
 * 思路：
 *      快慢指针
 *      快指针先走k步，然后快慢指针齐头并进，等快指针到达链尾时，慢指针所指即为所求
 */
function getKthFromEnd(head, k) {
  let fast = (slow = head);

  while (k--) {
    fast = fast.next;
  }

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
}
