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
    let dummyHead = new ListNode(0);
    dummyHead.next = head;
    let node = dummyHead;
    while(node){
        while(node.next&&node.next.val==val){
            // 跳过node.next 即删去它
            node.next = node.next.next;
        }
        node = node.next;
    }
    return dummyHead.next;
};