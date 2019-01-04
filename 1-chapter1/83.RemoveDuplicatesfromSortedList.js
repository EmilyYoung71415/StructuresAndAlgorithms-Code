/******************************************

删除排序链表的重复元素
给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

exp:
Input: 1->1->2
Output: 1->2

Input: 1->1->2->3->3
Output: 1->2->3

******************************************/
/***
 * 思考：
 *      因为是有序的。遍历的时候判断下个节点是否与当前的一致
 */

 function deleteDuplicates(head){
    let node = head;
    while(node&&node.next){
        if(node.val==node.next.val){
            node.next = node.next.next;
        }else{
            node = node.next;
        }
    }
    return head;
 }
