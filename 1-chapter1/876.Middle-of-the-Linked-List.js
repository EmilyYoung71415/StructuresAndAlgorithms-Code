/***********************

链表的中间节点
给定一个带有头结点 head 的非空单链表，返回链表的中间结点。
如果有两个中间结点，则返回第二个中间结点。

Input: [1,2,3,4,5]
Output: Node 3 from this list (Serialization: [3,4,5])

**************************/

/*****
 * 思考：快慢指针的经典应用了
 */

 function middleNode(head){
    let 
        slow = head,
        fast = head;
    while(slow!=null&&fast!=null&&fast.next!=null){
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
 }