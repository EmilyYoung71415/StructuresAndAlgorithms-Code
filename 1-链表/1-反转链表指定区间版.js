/***
 * leetcode:92
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。1 ≤ m ≤ n ≤ 链表长度。
 * 
 * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
 * 输出: 1->4->3->2->5->NULL
 */

function reverseBetween(head, m, n) {
    let dummy = new ListNode();
    dummy.next = head;
    let prev = dummy;

    // head指向m所在结点，prev指向head前的结点
    for (let i = 1; i < m; i++) {
        prev = prev.next;
    }
    
    head = prev.next;
    // 开始反转
    // 我们需要反转n-m次，head结点指向永远不变，head的next结点不断移动到待反转区域的首部
    for(let i=m; i<n; i++) {
        // 注意顺序
        let next_temp = head.next;
        head.next = next_temp.next;
        next_temp.next = head;
        prev.next = next_temp;
    }
    return dummy.next;
}

// WRONG思路： 顺向遍历的时候 加一个index索引记录 的思路是不可行的 ，因为这个依赖于上一次反转的结点链接修改 X!
// function reverseBetween(head, m, n) {
//     if (head==null) return head;
//     if (!(m>=1 && m <= n)) throw new Error('输入参数错误');

//     let index = 1;
//     let prev = null;
//     let originHead = head; // 当m-n不是反转整个链表时 return originHead
//     while (head && head.next) {
//         let next_temp = head.next;
//         if (m>=index && index <=n) {
//             head.next = prev;
//         }
//         else if (index > n) {
//             return originHead;
//         }
//         prev = head;
//         head = next_temp;
//         index++;
//     }
//     return head;
// }