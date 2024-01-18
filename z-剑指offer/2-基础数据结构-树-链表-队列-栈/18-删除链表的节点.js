/***
 * https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/
 * 给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
 * 返回删除后的链表的头节点。
 * 注意：此题对比原题有改动
 */

// 输入: head = [4,5,1,9], val = 5
// 输出: [4,1,9]
// 解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
// 题目保证链表中节点的值互不相同

/***
 * 思路：
 *      找到待删除节点的前一个结点，prev.next = prev.next.next
*/
// O(n) 常规思路
function deleteNode(head, val) {
    let prev = null;
    let p = head;

    while (p) {
        if (p.val === val) {
            // 删除头结点
            if (prev === null) return head.next;
            prev.next = prev.next.next;
            break;
        }
        prev = p;
        p = p.next;
    }
    return head;
}
// 代码改进： 借助dummy结点 简化链表操作
function deleteNode(head, val) {
    if (head==null) return head;
    let dummy = new ListNode();
    dummy.next = head;

    let p = dummy;
    while (p.next) {
        if (p.next.val === val) {
            p.next = p.next.next;
            break;
        }
        p = p.next;
    }

    return dummy.next;
}

// way2:O(1) 信息交换法
// LeetCode 上和书本原题有区别，原书上的 val参数是 ListNode 指针类型。
// 如果 toDelete 参数是 ListNode 类型，那么有没有时间复杂度是O(1)O(1)的做法呢？
// 将 toDelete.next 的 val 和 next 指针，全都赋值给 toDelete
// 边界情况是删除最后一个节点时，此时 toDelete.next 为 null。那么回退到普通解法。
// 综合时间复杂度为O(1)
function deleteNode(head, toDelete) {
    if (!toDelete || !head) return null;

    if (toDelete.next === null) {
        // toDelete是尾节点
        let dummy = new ListNode(-1);
        dummy.next = head;

        let p = dummy;
        while (p.next !== toDelete) {
            p = p.next;
        }
        p.next = null;
        return dummy.next;
    }
    // 将toDelete.next的值转移给toDelete，所以巧妙地将问题转换为删除toDelete.next
    else {
        toDelete.val = toDelete.next.val;
        toDelete.next = toDelete.next.next;
        return head;
    }
}