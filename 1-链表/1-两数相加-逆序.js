/***
 * leetcode:445
 *  2 -> 4 -> 3
 * +5 -> 6 -> 4
 * =7 -> 0 -> 8
 * 链表的代表的数字各自的位数是逆序存储，且每个节点只能存储一个数字
 * 数都为非负整数
 * 且除了0以外，都不会以0开头
 * 输入两个链表，返回相加后的新链表
 */
// 逆序的优势在于：从链表头遍历即使正确的低位
// 容易出错的例子：
// 5 +5 = 10
// 4 + 68 = 09 (not 081)
function addTwoNumbers(l1,l2) {
    let dummy = new ListNode();
    let p = dummy;
    let flag = 0; // 是否进1
    while(l1 || l2) {
        let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + flag;
        p.next = new ListNode(sum%10);
        p = p.next;
        flag = sum >= 10 ? 1 : 0;
        l1 = l1 ? l1.next : l1;
        l2 = l2 ? l2.next : l2;
    }
    // 5 + 5 = 0 1的情况
    flag && (p.next = new ListNode(1));
    return dummy.next;
}