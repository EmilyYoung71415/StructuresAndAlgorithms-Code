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
 * 图解：https://blog.csdn.net/FX677588/article/details/72357389
 */
function reverseList1(head){
    if(head==null||head.next==null){
        return head;
    }

    let newHead = null,
        p = head;
    while(p!=null){
        let temp = p.next;// 保存当前节点的下一个节点 
        p.next = newHead;// 先指向null，再依次变为上一个节点
        newHead = p;// 更新上一个节点
        p = temp; // 更新遍历节点
    }
    return newHead
}


function reverseList2(head){
    // 1->2->3->null 假如现在满足返回的条件 此时head.next==null head即为3 
    if(head==null||head.next==null){//head.next为递归base
        return head;
    }
    // 一直递归到原链尾 返回的newHead是3 传入的head.next是3，即head为2
    let newHead = reverseList2(head.next);
    // 从原链尾反指向 head.next(3).next = 2
    head.next.next = head;
    // 断开链接 不然要形成环
    head.next = null;
    return newHead;// 新链表头永远指向的是原链表的链尾
}