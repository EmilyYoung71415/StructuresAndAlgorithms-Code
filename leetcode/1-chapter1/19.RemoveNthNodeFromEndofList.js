/******************************************

删除链表的倒数第n个结点(计数开始为1) 并返回链表的头节点
exp：
    1->2->3->4->5, and n = 2.
    then:1->2->3->5.
进阶：
    尝试使用一遍扫描实现
******************************************/
/*****
 * 思路:
 *      删除倒数某个节点 // 怎么倒着？从链表的最后一个节点开始? no 不知道链表长度 所以这就是两次遍历的由来
 *      倒着遍历链表，找到 n-1、n+1节点
 *      使 n-1的next =  n+1节点 
 *      特殊节点；
 *      删除最后一个： n-1 节点的next=null
 *      删除第一个：head= n+1
 * 
 * 然而看解析：
 *      1、最常规的 两次遍历？ 
 *         ===-> 为什么我连这种解法都没想到？ 我那种解法又算什么
 *                 需要先知道链表的长度，遍历一次
 *                  找到倒数第n个元素 又遍历一次
 *      2、快慢双指针 + 一遍遍历
 *      pFirst \ pSecond
 *      先指针 先行n步，然后同时移动先后指针
 *      当先指针.next= null时  后指针.next 即为倒数第n个节点
 * 
 *      特殊情况：考虑头节点改变时
 *      删除的是头节点
 *      
 */
/**
* @param {ListNode} head
* @param {number} n
* @return {ListNode}
*/
function removeNthFromEnd1(head, n) {
    if(head==null||n==0){
        return head;
    }
    let 
        pFirst = head,
        pSecond = head;
    
    // 快指针先行n步
    while(n--){
        pFirst =  pFirst.next;
    }
    // 若删除的是头节点
    if(pFirst==null){
        return head.next;
    }
    // 同时继续移动指针 直到 pFirst.next=null
    while(pFirst.next){
        pFirst = pFirst.next;
        pSecond = pSecond.next;
    }

    pSecond.next = pSecond.next.next;
    return head;
};

/*****
 * 社区解法参考
 * 1、为了解决头节点问题，在头节点前生成了一个辅助节点，
 *    遍历一次获得链表总长度，然后正向遍历 删除
 * 2、递归
 */

 function removeNthFromEnd2(head,n){
    if (!head) {
        return null;
    }

    let dummyHead = new ListNode(-1);
    dummyHead.next = head;

    // 先遍历一遍链表，获取总长度
    let 
        listLength = 0,
        curLenNode = dummyHead.next;

    while (curLenNode != null) {
        listLength++;
        curLenNode = curLenNode.next;
    }

    // n大于链表长度，直接返回
    if (n > listLength) {
        return head;
    }

    // 删除倒数第n个节点，即删除正数第listLength - n个节点
    let cur = dummyHead;
    for (let i = 0; i < listLength - n; i++) {
        cur = cur.next;
    }
    // let delNode = cur.next;
    cur.next = cur.next.next;

    return dummyHead.next;
 }

/******
 * 解法三:
 *      遍历链表，每移动一步，n--
 *  1->2->3 n=4 不存在
 *  1->2->3 n=3 
 *  (变化:2、1、0)结束时为0即是正数的第0个节点
 *  1->2->3 n=2
 *  (变化:1、0、-1) 正数第1个
 * 
 * 遍历后n分成三种情况:
 *  >0： 不用调整链表、直接返回即可
 *  =0:  删除头节点： 返回head.next
 *  <0： 删除中间节点，需要找到删除节点的前一个节点
 *       prev.next = node.next.next;
 */

 // Jing
 function removeNthFromEnd(head,n){
    return removeNthFromEndHelper(head, n, 0) === n ? head.next : head;
    
    
   function removeNthFromEndHelper(head, n, count) {
       //一直遍历到链表末尾
        if (head.next !== null) {
            count = removeNthFromEndHelper(head.next, n, count);
        }
        // 删除的节点是中间节点，即n是符合(0~linkList.length)的
        // 执行删除步骤
        if (count === n) {
            head.next = head.next.next;
        }
        // 在中间阶段: ++count继续遍历
        return ++count;
    };
 }
 /****
  * 后记：
  *     双链表也是 逻辑一致 只是改变节点的两个指向
  */