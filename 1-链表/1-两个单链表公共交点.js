/****
 * 找到两个单链表相交的起始节点
 * 要求：
 *  如果两个链表没有交点，返回 null.
    在返回结果后，两个链表仍须保持原有的结构。
    可假定整个链表结构中没有循环。
    程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
    
    思路：
        既然他们会相交，那么快慢指针
    快的先走len1-len2步，然后他们一起走
    如果有一天 他们的next 相等了那么就是 相交了
    如果直到其中一方达到尽头了还没有相遇那么就今世无缘了
 */

 /**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    // 先找出两个链表的长度
    let len1 = 0,len2 = 0,dis = 0;//dis 是两链表长度之差
    let longer = shorter = null;// 长短链表引用
    let p1 = headA,p2 = headB;
    while(p1){
        p1 = p1.next;
        len1++;
    }
    while(p2){
        p2 = p2.next;
        len2++;
    }
    // 这里代码好冗余啊
    if(len1>len2){
        dis = len1-len2;
        longer =  headA;
        shorter = headB;
    }else{
        dis =  len2-len1;
        longer = headB;
        shorter = headA;
    }

    while(dis--){
        longer = longer.next
    }

    while(longer&&shorter){
        // if(longer.next==shorter.next){
        //     return longer.next
        // }
        // 万一开始就是交点..
        if(longer==shorter){
            return longer
        }
        longer = longer.next;
        shorter = shorter.next;
    }
    return null;
};

// 由于代码实在是太不美丽了。参考后优化
// 就是将长链表遍历指针放在 len1-len2那里太冗余了
function getIntersectionNode(headA,headB){
    let p1 = headA,
        p2 = headB;
    while(p1&&p2){
        p1 = p1.next;
        p2 = p2.next
    }

    // 其中一方 弹尽粮绝,那么剩下的那一方还有的长度就是他们的长度之差
    // 那就继续迭代引用p，同时head指向的真实链表搭个顺风车
    while(p1!=null){// headA长一点
        p1 = p1.next;
        headA =  headA.next;
    }

    while(p2!=null){
        p2 = p2.next;
        headB = headB.next;
    }
    // 开始一起走了，走在准备相遇的路上
    while(headA&&headB){
        if(headA==headB){
            return headA
        }
        headA = headA.next;
        headB = headB.next;
    }
    return null
}