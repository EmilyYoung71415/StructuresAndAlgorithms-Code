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

 /*****
  * 扩展：
  *     联想灵感：快慢指针的经典应用
  *     删除链表的中间节点 和 a/b处节点
  * 思考：
  *     中间节点： 快慢指针 当快指针到了链尾时，慢指针刚好在链中前一个
  *                slow.next = slow.next.next
  * 
  *     a/b节点:
  *         如1-2-3-4-5 a/b=r
  *         r==0 不删除任何节点
  *         r btw (0,1/5] 删除节点1
  *         r btw (1/5,2/5] 删除节点2
  *         ....
  *         r>1  不删除任何节点
  */
 function removeMidNode(head){
    if(head==null||head.next==null){
        return head;
    }
    //链表长度为2 删除头节点
    if(head.next.next==null){
        return head.next;
    }
    let 
        fast = head.next.next,
        slow = head.next; 
    while(fast.next!=null&&fast.next.next!=null){
        fast = fast.next.next;
        slow = slow.next;
    }
    // 跳出循环的时候slow指向中间节点的上一个节点
    slow = slow.next.next;
    return slow;
 }
// a/b 换算成节点下标
// index = ~~(a*len/b) ,len 为链表长度
/****
 * 思路：
 *      1、求链表长度
 *      2、知道删除第几个节点之后，找到需要删除节点的前一个节点
 *      第index-1个节点              
 */
function removeByRadio(head,a,b){
    let 
        len = 0,
        cur = head;
    while(cur!=null){
        len++;
        cur = cur.next;
    }
    let index = ~~(a*len/b);
    if(index==1){// 删除头节点
        head = head.next
    }
    if(index>1){
        cur = head;
        while(--index !=1){
            cur = cur.next;
        }
        cur = cur.next.next;
    }
    return head;
}