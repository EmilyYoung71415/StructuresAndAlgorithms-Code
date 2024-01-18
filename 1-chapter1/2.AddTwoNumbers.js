/******************************************


两个 非空 的链表用来表示两个非负的整数
各自的位数是按照 逆序 的方式存储
并且它们的每个节点只能存储 一位 数字
假设除了数字 0 之外，这两个数都不会以 0 开头

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.

 ******************************************/

 /******
  * 思路：
  *         难点：
  *                 进位
  *                 利用 dummyHead简化代码
  */

function addTwoNumbers(l1, l2) {
    let head = new ListNode(0);
    let rem = 0;// 进位数 0 or 1
    let curr = head;
    
    while (l1!==null || l2!==null) {
        let sum = (l1?l1.val:0) + (l2?l2.val:0) + rem;
        curr.next = new ListNode(sum%10);
        curr = curr.next;
        rem = sum>9?1:0;
        
        l1 = l1?l1.next:null;
        l2 = l2?l2.next:null;
    }
    if (rem===1) curr.next = new ListNode(rem); 
    return head.next;
};