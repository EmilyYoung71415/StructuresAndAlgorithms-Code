/****
 * https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/
 * leetcode: 138
 *
 * 请实现 copyRandomList 函数，复制一个复杂链表。
 * 在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。
 */
/***
 * 问题：
 *      1、常规链表的复制
 *      ===> 复制这里指的是 深拷贝
 *      2、多了一个random指针会带来什么改变吗
 *      ===> 由于一个结点可能被多个指针指到，因此如果该结点已被拷贝，则不需要重复拷贝；=> hash去重
 */
/**
 * // Definition for a Node.
 * function Node(val,next,random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/***
 * 迭代：时间O(N) 空间O(N)
 * 第一次遍历，复制每个节点和 next 指针，并且保存"原节点-复制节点"的映射关系 {原结点：拷贝结点}
 * 第二次遍历，通过哈希表获得节点对应的复制节点，更新 random 指针
 */
function copyRandomList1(head) {
  if (!head) return null;
  let visited = new Map();
  let p = head;

  while (p) {
    let oldnode = p;
    let newnode = new Node(p.val);
    visited.set(oldnode, newnode);
    p = p.next;
  }

  p = head;

  while (p) {
    let curnode = visited.get(p);
    curnode.next = visited.get(p.next) || null;
    curnode.random = visited.get(p.random) || null;
    p = p.next;
  }

  return visited.get(head);
}

// 代码优化 只遍历一次
function copyRandomList2(head) {
  if (!head) return null;
  let visited = new Map();
  let newHead = new Node(head.val);
  visited.set(head, newHead);
  let p = head;
  let cur = newHead;

  while (p) {
    cur.next = getCloneNode(p.next);
    cur.random = getCloneNode(p.random);
    p = p.next;
    cur = cur.next;
  }

  return visited.get(head);

  function getCloneNode(node) {
    if (!node) return null;
    if (!visited.get(node)) {
      let newnode = new Node(node.val);
      visited.set(node, newnode);
    }
    return visited.get(node);
  }
}

/***
 * 终极版
 * 时间O(N) 空间O(1)
 * 思路：
 *     使用哈希表的额外空间来保存已经拷贝过的结点 => 链表原地扩展: 在每个链表结点的旁边拷贝
 *     A->B->C => A->A'->B->B'->C->C'
 *     然后分离链表 返回A'->B'->C'
 */

function copyRandomList(head) {
  if (head == null) return head;

  // 原地扩展链表: 在cur cur.next 中间插入cur的克隆节点
  let cur = head;
  while (cur) {
    let newnode = new Node(cur.val);
    newnode.next = cur.next;
    cur.next = newnode;
    cur = newnode.next;
  }

  cur = head;

  // 链接random
  while (cur) {
    cur.next.random = cur.random ? cur.random.next : null; // cur.random的next结点即复制的结点
    cur = cur.next.next;
  }

  // 将两个链表分开
  let curOld = head;
  let curNew = head.next;
  let newHead = head.next;
  while (curOld) {
    // A -> A'-> B => A->B
    curOld.next = curOld.next.next;
    curNew.next = curNew.next ? curNew.next.next : null;
    curOld = curOld.next;
    curNew = curNew.next;
  }

  return newHead;
}

/***
 * DFS
 * 时间O(N) 空间O(N)
 */
function copyRandomList(head) {
  let visited = new Map();
  return copyRandomListCall(head);

  function copyRandomListCall(head) {
    if (!head) return null;
    if (visited.has(head)) return visited.get(head);

    let newnode = new Node(head.val);
    visited.set(head, newnode);
    // 一直递归 直到遇到尾节点 开始回溯
    newnode.next = copyRandomListCall(head.next);
    // 紧接着尾节点回溯 此时节点都在visited里了 return visited.getxxx
    newnode.random = copyRandomListCall(head.random);
    // 头-> 尾； 尾->头；所以最后正好返回头节点
    return newnode;
  }
}

/***
 * BFS
 * 时间O(N) 空间O(N)
 */
function copyRandomList(head) {
  let visited = new Map();
  return copyRandomListCall(head);

  function copyRandomListCall(head) {
    if (!head) return null;
    let newnode = new Node(head.val);
    visited.set(head, newnode);
    let queue = [head];

    while (queue.length) {
      let oldnode = queue.shift();
      let oldnode_next = oldnode.next;
      let oldnode_random = oldnode.random;

      if (oldnode_next && !visited.has(oldnode_next)) {
        let newnode_next = new Node(oldnode_next.val);
        visited.set(oldnode_next, newnode_next);
        queue.push(oldnode_next);
      }

      if (oldnode_random && !visited.has(oldnode_random)) {
        let newnode_random = new Node(oldnode_random.val);
        visited.set(oldnode_random, newnode_random);
        queue.push(newnode_random);
      }

      let curnode = visited.get(oldnode);
      if (curnode) {
        curnode.next = visited.get(oldnode_next) || null;
        curnode.random = visited.get(oldnode_random) || null;
      }
    }

    return newnode;
  }
}
