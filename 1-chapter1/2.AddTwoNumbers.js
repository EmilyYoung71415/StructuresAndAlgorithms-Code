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

/********
 * 思路比较好理解：
 *      因为是逆序排列，243 实际是数值342
 *      所以正好顺序遍历的时候,是从低位相加,所以需要考虑的是进位的问题
 * 
 * 解法:
 *      0、生成一个dummyHead作为开始 返回头结点则return dummyHead.next
 *         而且生成一个cur变量来代替head进行节点交互
 *         head.next 就一直是链表的头结点的下一个 cur是当前的指针
 *      1、while循环控制的条件是l1!=null||l2!=null 是or的关系
 *          循环里面判断当前节点是否为空，为空则置0
 *      2、给新链表当前节点赋值：
 *          curr.next = xxx;
 *          curr = curr.next;
 *          而不是 curr = xxx 节点得往下走吧
 *      3、当两个链表都完结了，即while循环终止
 *          考虑可能会进位的情况
 */