/******************************************

移除链表元素、
只要节点值与给定目标值一致的都删去

Input:  1->2->6->3->4->5->6, val = 6
Output: 1->2->3->4->5

******************************************/
/****
 * 思考：
 *      遍历的时候 如果相等则删除当前节点
 *      (83的变形)
 */
var removeElements = function(head, val) {
    // let node = head;
    // while(node&&node.next){
    //     if(node.val==val){
    //         node = node.next;//删去当前节点
    //     }
    //     node = node.next;// 保持循环
    // } 不合理 替换的逻辑
    // 所以生成一个 dummyHead?
    // return head;    
    // let dummyHead = new ListNode(0);
    // dummyHead.next = head;
    // let node = dummyHead;
    while(node){
        while(node.next&&node.next.val==val){
            // 跳过node.next 即删去它
            node.next = node.next.next;
        }
        node = node.next;
    }
   return node;
};

/****
 * 方法：
 *  1、利用容器
 *  2、与上个方法类似
 */

 function removeElements2(head,val){
    // 从头节点开始 找到第一个不是val的节点
    while(head){
        if(head.val!=val){
            break;
        }
        head = head.next;
    }

    // 继续往后遍历
    // 删除方式：将最近的一个值不等于val的节点pre链接到cur的下个节点
    // 如果不等于 则更新pre
    let 
        pre = head,
        cur = head;
    while(cur!=null){
        if(cur.val==val){
            pre.next = cur.next;
        }else{
            pre = cur;
        }
        cur = cur.next;
    }
    return head;
 }