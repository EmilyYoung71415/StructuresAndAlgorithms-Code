/**
 * https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/
 */
// wrong1: 相等时的处理
function mergeTwoLists(l1, l2) {
  let dummy = new ListNode();
  let p = dummy;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else if (l2.val < l1.val) {
      p.next = l2;
      l2 = l2.next;
    } else {
      p.next = l1;
      l1 = l1.next;
      l2 = l2.next;
    }
    p = p.next;
  }

  p = l1 || l2;
  return dummy.next;
}
// wrong2: l1,l2任一为空时的处理
function mergeTwoLists(l1, l2) {
  let dummy = new ListNode();
  let p = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else if (l2.val < l1.val) {
      p.next = l2;
      l2 = l2.next;
    }
    p = p.next;
  }
  // p.next = l1 || l2;
  p = l1 || l2;
  return dummy.next;
}
function ListNode(val) {
  this.val = val;
  this.next = null;
}
// right
function mergeTwoLists(l1, l2) {
  let dummy = new ListNode();
  let p = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else {
      p.next = l2;
      l2 = l2.next;
    }
    p = p.next;
  }

  p.next = l1 || l2;
  return dummy.next;
}

// ================================================================
// 递归版
// ================================================================
/***
 * 困难的地方：
 *      1、递归base是啥
 *      2、两个链表的输入 最后返回一条链表 递归结构怎么设计 谁来承接目标链表
 *              是 全局变量p + mergecall 的方式
 *            还是 return的值
 *      3、当其中一个链表没有的时候咋办
 */
// 错误
function mergeTwoLists(l1, l2) {
  let dummy = new ListNode();
  let p = dummy;
  mergeTwoListsCall(l1, l2);
  console.log(dummy.next);
  return dummy.next;
  function mergeTwoListsCall(l1, l2) {
    if (!(l1 && l2)) {
      p.next = l1 || l2;
      return;
    }
    // l1 l2的next都存在的情况
    // 递归return设计错误: mergeTwoListsCall递归 return null 但是 又将全局变量 等于递归返回值 & 递归case 与 正常都没有正确处理return
    // 走向判断错误：1、p.next = mergeTwoListsCall p.next = 递归base的return，相当于头插法了
    p.next = l1.val <= l2.val ? mergeTwoListsCall(l1.next, l2) : mergeTwoListsCall(l1, l2.next);
    p = p && p.next ? p.next : null;
  }
}

function mergeTwoLists(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val <= l2.val) {
    // 这一层 return l1 指针选择了l1
    // 同时指针向下移动，并指定了下一个节点是由递归的哪两个入口参数决定
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}
