/***
 * leetcode: 445
 * 数字最高位位于链表开始位置。它们的每个节点只存储单个数字
 *  (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
 * =  7 -> 8 -> 0 -> 7
 */
// 顺序的麻烦: 高位开始 且 意味着位数多的在开始
// 思路1：遍历两个链表，逆序存放在数组里，然后对数组进行遍历构造出新链表
// 思路2：反转两个链表相加后得到逆序的新链表，然后再将新链表反转
addTwoNumbers()
function addTwoNumbers(l1,l2) {
    let stack1 = [];
    let stack2 = [];
    let result = [];

    while (l1) {
        stack1.push(l1.val);
        l1 = l1.next;
    }

    while (l2) {
        stack2.push(l2.val);
        l2 = l2.next;
    }

    // 从低位到高位 依次的正确结果
    let flag = 0;
    while (stack1.length || stack2.length) {
        let sum = (stack1.pop() || 0) + (stack2.pop() || 0) + flag;
        // 使用额外数组存放结果 然后再构造，直接使用低位->高位的数据构造链表时反着的
        result.unshift(sum%10);// 高位-低位
        flag = sum > 9 ? 1 : 0; 
    }

    // 构造链表
    let dummy = new ListNode();
    let p = dummy;
    result.forEach(val=>{
        p.next = new ListNode(val);
        p = p.next;
    })

    // 5 + 5 
    if (flag==1) {
        let insertHead = new ListNode(1);
        insertHead.next = dummy.next;
        return insertHead;
    };
    
    return dummy.next;
}
