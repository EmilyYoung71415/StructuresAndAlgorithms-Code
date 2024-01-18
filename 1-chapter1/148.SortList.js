/******************************************

排序链表、升序
要求:在 O(nlogn) 时间复杂度和常数级空间复杂度下
exp:
    Input: 4->2->1->3
    Output: 1->2->3->4

    Input: -1->5->3->4->0
    Output: -1->0->3->4->5
******************************************/
/*******
 * nlogn 就想到了 高级排序： 快排、归并
 * 但是这里是链表，且空间复杂度要求是常数级
 * 对于归并排序，复杂度是O(n)+递归的栈空间
 *              O(n)是复制出相等的空间进行赋值归并
 * 对于快排： 复杂度是递归的栈空间
 * 
 * 研究链表的归并排序：
 *     1、归并思想： 将链表分成两段、且常数级别空间复杂度
 * ===-> 快慢指针划分终点:　
 *           快的每次走两步，慢的每次一步，快的走完了，慢的刚好在中点
 *     2、有序链表的合并
 * 
 */

function sortList(head){
    if(head==null||head.next==null){
        return head;
    }
    let 
        slow = head,
        preSlow = head,// 用于将两个链表隔断
        fast = head;
    // 快慢指针 找划分点
    while(fast!=null&&fast.next!=null){
        preSlow = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    preSlow.next = null;
    return mergeList(sortList(head),sortList(slow));
}

function mergeList(list1,list2){
    // 一个辅助节点
    let 
        dummyHead = new ListNode(0),
        cur = dummyHead;
    while(list1!=null&&list2!=null){
        if(list1.val<list2.val){
            cur.next = list1;
            list1 = list1.next;
        }else{
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1||list2;
    return dummyHead.next;
}

