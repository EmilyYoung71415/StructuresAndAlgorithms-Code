/*******************
    环形链表2
    给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

    为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 
    如果 pos 是 -1，则在该链表中没有环。

    说明：不允许修改给定的链表。
    进阶：你是否可以不用额外空间解决此题？
 ***********************/

 /****
  * 思考：  
  *    相较环形链表1，不同点：返回链表开始入环的第一个节点
  *    思路：
  *         判断是否存在环：
  *         1、快慢节点、2、都指向head、3、一个hash容器，存放遍历的节点如果存在相同的证明有环
  *         2、入环节点
  *             一个重要的结论：
  *             第一次相遇时slow走过的距离：a+b，fast走过的距离：a+b+c+b。
  *             因为fast的速度是slow的两倍，所以fast走的距离是slow的两倍，有 2(a+b) = a+b+c+b，
  *             可以得到a=c（这个结论很重要！）。
  * 
  *         so思路:
  *         找到第一次相遇的节点之后，让slow归位起点。每次走一步，就会在环的第一个节点相遇
  * 参考链接：
  *     https://blog.csdn.net/xy010902100449/article/details/48995255
  */

  function detectCycle(head){
    let 
        fast  = head,
        slow = head;
    if(!head) return null;
    while(fast!=null&&fast.next!=null){
        fast = fast.next.next;
        slow = slow.next;
        if(fast==slow){
            break;
        }
    }

    if(fast==slow&&fast.next!=null){
        slow = head;// 回归到起点
        while(slow!=fast){
            slow = slow.next;
            fast = fast.next;
        }
        // 再次相遇的时候即为入环处
        return fast;
    }
    return null;
}


// 精简函数
function detectCycle(head){
    let 
        fast  = head,
        slow = head;
    if(!head) return null;
    while(fast!=null&&fast.next!=null){
        fast = fast.next.next;
        slow = slow.next;
        // if(fast==slow){
        //     break;
        // }
        if(fast==slow){
            slow = head;// 回归到起点
            while(slow!=fast){
                slow = slow.next;
                fast = fast.next;
            }
            // 再次相遇的时候即为入环处
            return fast;
        }
    }
    return null;
}

/***
 * 扩展:
 *  环的长度、
 *  入环处的第一个节点
 *  将有环链表变为单链表
 *  判断两个单链表是否有交点、找到第一个相交的节点
 * 
 **/