/****
 * leetcode:147.对链表进行插入排序
 * 
 * 
 * 
 */

 /**
 *  输入: 4->2->1->3
    输出: 1->2->3->4
 * @param {ListNode} head
 * @return {ListNode}
 */
function insertionSortList(head) {
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