/****
 * Given a non-empty, singly linked list with head node head,
 * return a middle node of linked list.
 *
 * exp:
 * [1,2,3,4,5]==>[3,4,5]
 * [1,2,3,4,5,6]==>[4,5,6]
 *
 * 思路：
 *  双指针
 *  快指针每次跑 2步，慢指针每次跑1步。
 *  起始条件：快慢指针都在head
 *  终止条件: []为奇数：fast.next==null
 *          []为偶数： fast = null
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let fast = (slow = head);
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};
