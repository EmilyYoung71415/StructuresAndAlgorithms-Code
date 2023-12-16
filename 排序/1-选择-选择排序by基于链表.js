/****
 * 每一趟在原链表中截取最大的节点(选择)放在新链表的最前端
 * 假设链表不带头节点
 */

function selectSortList(head) {
  let temp = head; // 在此节点上进行遍历 和截取
  let dummy = new ListNode();
  while (temp != null) {
    let s = (p = head), // s:最大节点 p遍历节点
      sp = (pp = null); // s、p各自的前驱节点
    while (p != null) {
      if (p.val > s.val) {
        s = p;
        sp = pp;
      }
      pp = p;
      p = p.next;
    }
    if (s == temp) {
      // 最大节点在原链表头
      temp = temp.next;
    } else {
      // 在原链表中间 截取当前s
      sp.next = s.next;
    }
    // 将最大节点插入到结果链表头节点下一个位置
    s.next = dummy.next;
    dummy.next = s;
  }
  return dummy.next;
}
