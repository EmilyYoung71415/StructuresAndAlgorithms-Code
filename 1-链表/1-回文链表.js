/***
 * leetcode 234
 * 请判断一个链表是否为回文链表。
 * 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 */

// 思路：遍历1遍，将数据存放在数组里 然后转换为判断数组的回文
function isPalindrome(head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }

  let i = 0;
  let len = arr.length;
  while (i <= Math.floor(len / 2)) {
    if (arr[i] !== arr[len - 1 - i]) {
      return false;
    }
    i++;
  }
  return true;
}

// 思路2: 回文链表反转后，与原链表一致
// 实现2-1：生成新的链表-反转链表 ==> 但是有深拷贝的问题 => 使用头插法
function isPalindrome(head) {
  let reverseDummy = new ListNode();
  let p = head;
  while (p) {
    let next_temp = p.next;
    p.next = reverseDummy.next;
    reverseDummy.next = p;
    p = next_temp;
  }
  console.log(reverseDummy); // 新的反转的节点
  console.log(head); // head节点被破坏了断链了 =》因为是引用修改 => 解决方式1.p= 深拷贝(head)
  // 有没有其他方式：能在反转链表后 保持head节点指向原链表的头节点
  let reverseHead = reverseDummy.next;
  while (reverseHead && head) {
    if (reverseHead.val !== head.val) {
      return false;
    }
    reverseHead = reverseHead.next;
    head = head.next;
  }
  return true;
}

// 实现2-2：借助双向链表思路，prev属性记录一个反向遍历
function isPalindrome(head) {
  let tail = head;
  let prev = null;
  while (tail) {
    tail.prev = prev;
    prev = tail;
    tail = tail.next;
  }
  // prev指向链尾
  let temp = prev;
  while (head) {
    if (head.val === temp.val) {
      head = head.next;
      temp = temp.prev;
    } else {
      return false;
    }
  }
  return true;
}

// 递归版本
function isPalindrome(head) {
  let left = head;
  return traverse(head);

  function traverse(node) {
    if (node == null) return true;
    let prevIsSame = traverse(node.next);
    // 逆序输出code
    let currIsSame = left.val === node.val;
    left = left.next; // left通过这种方式向右，node通过弹栈的方式向左
    return prevIsSame && currIsSame;
  }
}

// 快慢指针法找到中间结点，然后反转链表右半边，再两个指针一起遍历
function isPalindrome(head) {
  if (head == null || head.next == null) return true;

  // 快慢指针找中间结点
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 当链表为偶数是，slow指向中轴偏左，链表为奇数，slow指向中间结点
  slow.next = reverse(slow.next); // 反转右半边链表
  // 1->2->3->2->1
  // 1->2->3->1->2
  // slow指向右半边链表的第一个结点,head还是链表的第一个结点
  slow = slow.next;

  // 两指针一起遍历判断
  while (slow) {
    if (slow.val !== head.val) {
      return false;
    }
    slow = slow.next;
    head = head.next;
  }
  return true;

  // 反转链表 返回新的头结点
  function reverse(head) {
    let prev = null;
    while (head) {
      let nex_temp = head.next;
      head.next = prev;
      prev = head;
      head = nex_temp;
    }
    return prev;
  }
}
