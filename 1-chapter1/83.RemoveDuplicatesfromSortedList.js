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
/****
 删除非排序链表的重复元素
1-2-3-3-4-4-2-1-1-NULL
=->
1-2-3-4-NULL

思路：
1、一个容器保存当前未重复的元素们 额外空间复杂度O(n)
    哈希表最佳
2、选择排序思想 遍历到当前元素时，再遍历剩下的元素，过滤掉等于当前元素值的节点
*/
// 1
function deleteDuplicatesfromUnsortedList1(head){
    let 
        hash = {},
        prev = head,
        cur = head.next;
    // 第一个肯定是不重复的 所以从第二个开始排查
    hash[head.val]  = 1;
    while(cur!=null){
        if(hash[cur.val]){
            prev.next = cur.next;
        }else{
            prev.next = cur;
        }
        cur = cur.next
    }  
}

function deleteDuplicatesfromUnsortedList2(head){
    let 
        cur = head,
        prev = null,
        next = null;
    while(cur!=null){
        prev = cur;
        next = cur.next;
        // 选排的内部查找
        while(next!=null){
            // 在链表中删除与当前元素相等的节点
            if(cur.val==next.val){
                prev.next = next.next;
            }else{
                prev = next;
            }
            next = next.next;
        }
        cur = cur.next;
    }
}