/*****
 * 在 O(n log n) 时间复杂度和
 * 常数级空间复杂度下，对链表进行排序
 * 
 * 思路：
 *  遍历链表，把数全部放入数组，然后对数组进行快排
 *  再遍历数组 生成链表
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 输入: 4->2->1->3
    输出: 1->2->3->4
 */
function sortList(head){
    let arr = [],
        index = 0;
    while(head){
        arr[index++] = head.val;
        head = head.next;
    }
    // 从大到小排 然后使用头插法
    let arr_sorted = arr.sort((a,b)=>b-a)

    let dummy = new ListNode();
    arr_sorted.forEach(item=>{
        let newnode = new ListNode(item);
        newnode.next = dummy.next;
        dummy.next = newnode;
    })
    return dummy.next;
}   

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