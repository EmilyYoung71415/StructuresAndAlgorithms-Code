/***
 * exp:
 *  1->2->3->4->5, and n = 2.
    ==>  1->2->3->5.
 * 思路：
        倒数第n个。 从1开始计数
        双指针法：fast先走 n步，然后一起走，等fsat到终点，
                slow指向删除节点的前一个节点
        设计：起始条件：fast、slow起点都在head,
              结束条件：fast.next == null
        特殊情况：
            删除第一节点
 */

// 此题关键在于找到倒数第n个结点
function getLastkNode(head, n) {
  let fast = (slow = head);

  while (n--) {
    fast = fast.next;
  }

  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // 【code review】 输入判断
  if (head == null || n < 1) {
    return head;
  }
  let fast = (slow = head);
  while (n--) {
    fast = fast.next;
  }
  // 删去头结点
  if (fast == null) {
    // head =  head.next
    // return head; 【code review】
    return head.next;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
};
