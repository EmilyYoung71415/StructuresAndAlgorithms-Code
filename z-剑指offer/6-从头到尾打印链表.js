/**
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 * https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/
 */
// 输入：head = [1,3,2]
// 输出：[2,3,1]

function reversePrint(head) {
    if (!head) return [];
    let arr = [];
    reversePrintCall(head);
    return arr;

    function reversePrintCall(head) {
        if (!head) return;
        head.next && reversePrintCall(head.next);
        arr.push(head.val);
    }
}

// 优化

function reversePrint(head) {
    if (!head) return [];
    let res = reversePrint(head.next);
    res.push(head.val);
    return res;
}