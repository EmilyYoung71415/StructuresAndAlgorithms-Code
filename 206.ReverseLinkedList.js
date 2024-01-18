/******************************************

反转链表

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL

******************************************/

/*******
 * 思路:
 *      不是反向遍历链表输出节点
 *      way1:迭代反转链表，从头到尾扫描
 *          设置两个指针p\newHead,newHead是新链表的头指针(永远指向链表的头节点)
 *          p是遍历的那个指针
 *      way2:
 *          递归
 * 
 */
function reverseList1(head){
    if(head==null||head.next==null){
        return head;
    }

    let newHead = null,
        p = head;
    while(p!=null){
        let temp = p.next;
        p.next = newHead;//p的next指向前一个空间
        newHead = p;// 新链表表头扩大
        p = temp;
    }
    return newHead
}


function reverseList2(head){
    if(head==null||head.next==null){//head.next为递归base
        return head;
    }
    let newHead = reverseList2(head.next);
    head.next.next = head;
    head.next = null;// 断开指针链接
    return newHead;// 新链表头永远指向的是原链表的链尾
}