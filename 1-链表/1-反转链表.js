/***
 * leetcode 206
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
// 头插法思路借鉴
function reverseList1(head) {
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

function reverseList2(head){
    // 链尾
    if(head==null||head.next ==null){
        return head;
    }
    // 返回新链表的头节点 即原链尾
    // 输入一个节点head，将「以head为起点」的链表反转，并返回反转之后的头结点。
    let newhead = reverseList(head.next);
    // 此时的head是倒数第二个节点 (当第一次回溯的时候)
    head.next.next = head;
    head.next = null;// 断开原链接 不然要环
    return newhead;
}


/***
 * 借用循环链表的思想 使用prev记录
 * 需要遍历两次
 * 遍历1、将每个阶段的新next使用prev结点记录，同时更新head，遍历结束后head指向链尾
 * 遍历2、从尾部开始反向遍历（依靠prev结点），遍历时将结点的next指向prev，同时删去prev结点
 */

function reverseList(head) {
    if(head==null||head.next ==null){
        return head;
    }
    // 遍历1
    let prev = null; // 初始化 head 结点的prev为null
    while(head) {
        head.prev = prev;
        prev = head;
        head = head.next;
    }
    // 此时head指向null 指向链尾的是prev
    head = prev;
    let p = head;
    let pprev = p.prev;
    // 遍历2 将prev指向的值替换到next
    while (p && pprev) { // 因为这里要引用p.prev 而 while里又要删去prev属性 所以使用pprev变量
        delete p.prev;
        p.next = pprev;
        p = pprev;
        pprev = p.prev;
    } 

    // 头结点处理
    p.next = null;
    delete p.prev;
    return head;
}

// 优化，依赖局部变量修改链表里结点的指向关系
function reverseList(head) {
    if(head==null||head.next ==null){
        return head;
    }
    let prev = null;
    while (head && head.next) {
        let next_temp = head.next;
        head.next = prev;
        prev = head;
        head = next_temp;        
    }
    head.next = prev;
    return head;
}