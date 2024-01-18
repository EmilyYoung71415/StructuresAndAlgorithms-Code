/***
 * 已知链表中含有环，返回这个环的起始位置
 * (index在链表中以0开始计数)
 * 如果链表无环，则返回 null
 * leetcode: 142
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// 利用快慢指针的路程差
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
console.log(detectCycle());
function detectCycle(head) {
  if (head == null) return null;
  let slow = (fast = head);
  // 求出第一次相遇的位置 同判断链表是否有环一致
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      // 将slow指针指回head
      slow = head;
      // 开始第二次相遇 此时的相遇点即为环起始
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  // 直接while跳出的 即无环情况
  return null;
}

// 如果不适用while嵌套的方式 而是直接在第一次相遇之后break的话，记得加上是否有环标记
function detectCycle(head) {
  let slow = (fast = head);
  let hasCycle = false;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      hasCycle = true;
      break;
    }
  }

  if (!hasCycle) return null;
  // 有环的情况
  slow = head;

  while (slow !== fast) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
}
