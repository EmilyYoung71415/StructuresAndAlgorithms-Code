/******************************************

找到两个单链表相交的起始节点

A:          a1 → a2
                   ↘
                     c1 → c2 → c3
                   ↗            
B:     b1 → b2 → b3

在c1相交

注意：

如果两个链表没有交点，返回 null.
在返回结果后，两个链表仍须保持原有的结构。
可假定整个链表结构中没有循环。
程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。

******************************************/
/******
 * 思路：
 * 
 *  两个指针，同时标记两个链表。
 *  如果他们的节点一致了(初次) 则相交节点
 *  问题在于：
 *      找到他们可以一起出发的点，此点能保证他们的长度一致
 * 优化：两个链表较长的那个先走 n步
 * 48%
 */
function getIntersectionNode(headA, headB) {
    let p1 = headA,
        p2 = headB;

    while(p1!=null&&p2!=null){
        p1 = p1.next;
        p2 = p2.next;
    }

    while(p1!=null){//p2循环完毕，headb短些
        headA = headA.next;
        p1 = p1.next;
    }
   
    while(p2!=null){
        headB = headB.next;
        p2 = p2.next;
    }
    // headA、headB分别是两个链表的同一长度起始点
    // 从两head开始遍历至结尾走同样的步数
    while (headA!=null&&headB!=null){
        if(headA==headB){
            return headA;
        }
        headA=headA.next;
        headB=headB.next;
    }
    return null;
};

// way2
function getIntersectionNode2(headA, headB) {
    let nodea = headA, nodeb = headB;
    while(nodea!==nodeb) {
        nodea = nodea ? nodea.next : headB;
        nodeb = nodeb ? nodeb.next : headA;
    }
    return nodea
};