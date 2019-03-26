/****
 * 排序，有两个相关的问题：
 * 1、一带有头结点的单链表，设计算法使其递增有序
 * 2、一带有头结点的单链表，按照递增次序输出节点元素
 * 
 */

// 单链表就地排序 
// leetcode:147.对链表进行插入排序\148. 排序链表O(n log n)

// 147
/**
 *  输入: 4->2->1->3
    输出: 1->2->3->4
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function(head) {
    let dummy =  new ListNode();// 头结点
    let p = head;// 新来节点 将要插入的
        
    while(p!=null){// 遍历节点p，新来节点
        let temp = p.next;
        let prev = dummy;// 每次从已排序元素的head遍历
        while(prev.next!=null&&prev.next.val<p.val){
            prev = prev.next 
        }
        // 在prev 和 prev.next 之间插入p
        p.next = prev.next;
        prev.next = p;
        p = temp;
    }
    return dummy.next;
};
