/***
 * 反转单链表
 *  Input: 1->2->3->4->5->NULL
    Output: 5->4->3->2->1->NULL
    进阶：
        你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
    思路：
    1、头插法建立链表。
        遍历链表的时候，将遍历的元素当成新元素。
        使用头插法建立链表
    2、遍历到链尾，回溯的的时候依次改变指向？
        递归
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let dummy = new ListNode();
    let curr = dummy;
    while(head){
        let temp = head.next;
        head.next = curr.next;
        curr.next = head;
        head = temp;
    }
    return dummy.next ;
};

function reverseList(head){
    // 链尾
    if(head==null||head.next ==null){
        return head;
    }
    // 返回新链表的头节点 即原链尾
    let newhead = reverseList(head.next);
    // 此时的head是倒数第二个节点 (当第一次回溯的时候)
    head.next.next = head;
    head.next = null;// 断开原链接 不然要环
    return newhead;
}
