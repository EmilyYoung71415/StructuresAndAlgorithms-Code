/***
 * https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/
 * 输入两个链表，找出它们的第一个公共节点。
 *  如果两个链表没有交点，返回 null.
    在返回结果后，两个链表仍须保持原有的结构。
    可假定整个链表结构中没有循环。
    程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
 */

/***
 * 思路：
 *    way1:双指针路程差
 *    长链表 - 短链表的路程差 <= 快指针先走的部分
 *    此题给出了 各自相交之前的长度，那么就不用单独求链长了
 *    为啥还给出了相交结点的值？
 *
 * 扩展：
 *    两个链表的第一个公共交点 => 二叉树中两个叶节点的最低公共祖先
 *    只是前者的指针遍历是从叶节点到根节点
 */

function getIntersectionNode(intersectVal, listA, listB, skipA, skipB) {
  if (!listA || !listB) return null;
  let distance = Math.abs(skipB - skipA);
  let p1 = listA;
  let p2 = listB;
  while (distance--) {
    if (skipB > skipA) {
      p2 = p2.next;
    } else {
      p1 = p1.next;
    }
  }

  while (p1 && p2) {
    if (p1 === p2) return p1;
    p1 = p1.next;
    p2 = p2.next;
  }
}

// way2: 链表相交法，当链表走到链尾后，将尾指针指向另一个链表，如果链表1、2有相交而不是平行，那么就会形成一个环
// 利用两指针在环里跑总会相遇
function getIntersectionNode(intersectVal, listA, listB, skipA, skipB) {
  if (!listA || !listB) return null;
  let p1 = listA;
  let p2 = listB;

  while (p1 != p2) {
    p1 = p1 == null ? listB : p1.next;
    p2 = p2 == null ? listA : p2.next;
  }

  return p1;
}
