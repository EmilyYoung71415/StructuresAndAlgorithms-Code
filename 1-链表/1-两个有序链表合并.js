/****
 * leetcode 21
 * Merge two sorted linked lists and return it as a new list
 * 
 *  Input: 1->2->4, 1->3->4
    Output: 1->1->2->3->4->4
 * 
 * The new list should be made by splicing together the nodes of the first two lists.
 * 这是啥意思？到底是新链表还是旧的上拼接？
 * 好吧应该是旧拼接
 */

 /**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(l1==null) return l2;
    if(l2==null) return l1;
    if(l1.val<l2.val){
        l1.next = mergeTwoLists(l1.next,l2);
        return l1;
    }else{
        l2.next  = mergeTwoLists(l1,l2.next);
        return l2;
    }
};

// 迭代
function mergeTwoLists(l1,l2){
    let dummy = new ListNode();// 头结点
    let curr = dummy;
    while(l1&&l2){
        if(l1.val<l2.val){
            curr.next  = l1;
            l1 = l1.next
        }else{
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    curr.next = l1?l1:l2
    return dummy.next;
}