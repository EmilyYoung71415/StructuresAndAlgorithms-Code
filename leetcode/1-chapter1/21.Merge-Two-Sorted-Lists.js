/******************************************

合并两个有序链表

 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4

******************************************/
/****
 * 经典题目 
 * 思路如码
 */


/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    
    //let dummy = new ListNode(0);
    if( !l1 ) return l2;
    if( !l2 ) return l1;
    let head;
    if( l1.val > l2.val ){
        head = l2;
        l2 = l2.next;
    }else{
        head = l1;
        l1 = l1.next;
    }
    let node = head;
    while( l1 && l2 ){
        if( l1.val > l2.val ){
            node.next = l2;
            l2 = l2.next;
        }else{
            node.next = l1;
            l1 = l1.next;
        }
        node = node.next;
    }
    node.next = l1 ? l1 : l2;
    return head;
};

/**
 *  优化
 * 
 * 
 */

function mergeTwoLists2(l1,l2){
    if(l1 == null) return l2;
    if(l2 == null) return l1;
    if(l1.val < l2.val){
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else{
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}