/***
 * 双链表：
 * 每个指针域具有两个指向：next、prev
 *
 * 插入add
 * getItemByNum按序号查找节点
 * getItem按值查找节点
 * insert(x,index)
 * removeAt删除节点：删除第i个节点
 */

function Node(data) {
  this.data = data;
  this.prev = null;
  this.next = null;
}

class DoublyLinkedListF {
  constructor() {
    this.head = new Node();
  }
  add(x) {
    let newnode = new Node(x);
    newnode.next = this.head.next;
    // 修改newnode->next的前驱节点
    if (this.head.next != null) {
      this.head.next.prev = newnode;
    }
    this.head.next = newnode;
    newnode.prev = this.head;
  }
  getItemByNum(index) {
    if (index == 0) return this.head;
    if (index < 1 || index == null) throw new Error('不存在节点');
    let j = 1;
    let p = this.head.next;
    while (p && j < index) {
      p = p.next;
      j++;
    }
    return p;
  }
  getItem(data) {
    let p = this.head;
    while (p && p.data == data) {
      p = p.next;
    }
    return p;
  }
  // 支持链头插入和链尾插入
  insert(x, index) {
    let p = this.getItemByNum(index - 1);
    if (p == null) throw new Error('位置超出链表范围');
    let newnode = new Node(x);
    newnode.next = p.next;
    if (p.next) {
      p.next.prev = newnode;
    }
    p.next = newnode;
    newnode.prev = p;
  }
  // 删除第i个节点:支持删除链尾、链头
  removeAt(index) {
    // 删除节点p的后继节点
    let p = this.getItemByNum(index - 1);
    if (p == null) throw new Error('位置超出链表范围');
    let q = p.next; // q就是删除的那个节点
    p.next = q.next;
    if (q.next) {
      // q.next不存在 可能是链尾
      q.next.prev = p;
    }
  }
}
// 建议在浏览器端打印测试更直观
// let p = new DoublyLinkedListF()
// let arr = [3,4,1,2,6];
// arr.forEach(item=>{
//     p.add(item)
// })
// p.removeAt(1)

module.exports = DoublyLinkedListF;
