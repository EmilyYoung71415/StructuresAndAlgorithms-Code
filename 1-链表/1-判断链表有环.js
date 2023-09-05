/**
 * 给定一个链表，判断其是否含有环
 * 进阶：能尽量不使用额外空间吗
 * 
 * 思路：
 * 1、遍历链表节点，一直到时间尽头，如果都一直是node.next 有值
 *    可认为链表无环。。(纯为了ac)
 * 2、将遍历了的节点做个标记，以node对象的标记而不是标记节点的值
 * ===>解法1 将遍历的节点都放在hash里（比{}更专业的hash结构：Map
 *     解法2：做标记的方式除了申请一个额外空间，还可以？
 *           因为是单链表，所以模仿循环链表的方式，
 *           将遍历的每个节点.next都指向head,如果新节点.next = head
 *           那就证明这个节点之前被篡改过，即又遇到了标记过的节点 
 *         ==-> 效率最高
 * 3、双指针
 *     快指针每次跑2步，慢指针每次跑1步
 *     如果有环 他们总会相遇
 *         ===> 效率也比较高
 * 注意输入判断：
 *  if(head == null || head.next == null) {
        return false;
    }
 * 
 **/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let hash = new Map();
  while (head) {
    if (hash.has(head)) {
      return true;
    }
    hash.set(head);
    head = head.next;
  }
  return false;
};

function hasCycle(head) {
  let curr = head;
  while (curr) {
    if (curr.next == head) {
      return true;
    }
    let temp = curr.next;
    curr.next = head;
    curr = temp;
  }
  return false;
}

function hasCycle(head) {
  if (head == null || head.next == null) {
    return false;
  }
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast == slow) {
      return true;
    }
  }
  return false;
}
