/******************************************
环形链表
为了表示给定链表中的环，
我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）
如果 pos 是 -1，则在该链表中没有环


判断链表里是否有环
* Definition for singly-linked list.
* function ListNode(val) {
*     this.val = val;
*     this.next = null;
* }

exp:
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。

输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。

输入：head = [1], pos = -1
输出：false
解释：链表中没有环。

******************************************/
/*****
 * 思路：
 *  (btw:pos与题解无关，只是说明国际惯例上习惯引入一个pos来表示该链表有环
 *  (实际题目想求的是 给定一个链表head 通过怎样的遍历可以得出该链表是否含有环
 *  常规做法:
 *      遍历链表时，如果没有环，我们可以遍历到最后一个元素指向空结束
 *      但是当存在环的时候，同样的方法则会进入死循环
 * 
 * 
 * 两种方法：
 *  1、快慢指针 // 9.41%
 * 如果存在环则快慢指针会相等、如果不存在 则会空指针
 * 
 *  2、在遍历过程中将每个node指向head，如果不存在环那么会有空指针
 *     如果存在环，最终会以指向head结束
 *  // 100%
 */

function hasCycle1(head){
    let fast = head,
        slow = head;
    // 只要fast指针在跑那么他们一定会相遇 一个一次走一步 一个一次走两步 有环的时候在围着圈子跑
    while(fast!=null&&fast.next!=null){
        slow = slow.next;
        fast = fast.next.next;
        if(slow==fast){
            return true;      
        }
    }
    return false;
}

// 快慢指针改进 
var hasCycle = function(head) {
    if( head == null || head.next == null ){ 
        return false; 
    }
    var slow = head ,fast = head.next;
    // 判断条件交换了下位置 
    while( slow != fast ){
        if( fast == null || fast.next == null ){ 
            return false; 
        }
        fast = fast.next.next ;
        slow = slow.next;
    }
    return true;
};


function hasCycle2(head){
    if(head == null || head.next == null) {
        return false;
    }

    let node = head;
    while(node != null) {
        // 如果有环 这个节点之前就被设置过指向
        if(node.next == head) {
            return true;
        }

        let temp = node.next;
        node.next = head;
        node = temp;
    }

    return false;
}