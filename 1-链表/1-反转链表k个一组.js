/******
 * leetcode 25
 * 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 * 你的算法只能使用常数的额外空间。
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 */

// 给你这个链表：1->2->3->4->5
// 当 k = 2 时，应当返回: 2->1->4->3->5
// 当 k = 3 时，应当返回: 3->2->1->4->5

/****
 * 思路：
 *  1、先反转以 head 开头的 k 个元素。
    2、将第 k + 1 个元素作为 head 递归调用 reverseKGroup 函数。
    3、将上述两个过程的结果连接起来。
 */
function reverseKGroup(head, k) {
    if (head == null) return null;
    // 反转区间[a, b) 包含 k 个待反转元素
    let a, b;
    a = b = head;
    for (let i = 0; i < k; i++) {
        // 不足 k 个，不需要反转，base case
        if (b == null) return head;
        b = b.next;
    }
    // 反转前 k 个元素
    let newHead = reverse(a, b);
    // 递归反转后续链表并连接起来
    a.next = reverseKGroup(b, k);
    return newHead;

    // [start, end)
    function reverse(start, end) {
        let pre = null, cur = start, next = start;
        while (cur !== end) {
            next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        // 返回反转后的头结点
        return pre;
    }
}