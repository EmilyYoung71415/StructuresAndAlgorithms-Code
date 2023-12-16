/***
 * 头插法建立链表简单但是读入数据顺序与生产的链表顺序是相反的
 * 由此引入尾插法，相比头插需要两个指针，rear指针永远指向链尾
 * 解惑：
 *  为啥还需要头结点呢
 *  插入的时候：插入第一个节点
 * add-插入:
 *      新来的节点都放在头结点的next位置。
 *      所以建立的链表顺序是反序的
 * getItemByNum按序号查找节点
 * getItem按值查找节点
 * insertAt(data,index)第index位置删除节点
 * removeAt删除节点：删除第i个节点
 *      特殊删除：假如让直接删除节点p
 *      remove(node){
 *          //当前节点着下一个节点的值
 *          node.data = node.next.data
 *          // 删除下个节点
 *          node.next = node.next.next;
 *      }
 */

function Node(data) {
  this.data = data;
  this.next = null;
}

class LinkedListR {
  constructor() {
    this.head = new Node();
    // rear始终指向尾节点，开始指向头结点
    this.rear = this.head;
  }
  add(x) {
    let newnode = new Node(x);
    this.rear.next = newnode;
    this.rear = newnode;
  }
  getItemByNum(index) {
    if (index == 0) return this.head;
    if (index < 1 || index == null) throw new Error('没有这样的节点');
    let j = 1;
    let p = this.head.next;
    while (p && j < index) {
      p = p.next;
      j++;
    }
    return p;
  }
  getItem(data) {
    let p = this.head.next;
    while (p && p.data != data) {
      p = p.next;
    }
    return p;
  }
  // 在第index位置上插入x节点
  // 如果是最后一个节点插入，更新rear
  insertAt(x, index) {
    let p = this.getItemByNum(index - 1);
    if (p.next == null) {
      //即在链尾插入节点
      this.add(x);
      return;
    }
    let newnode = new Node(x);
    newnode.next = p.next;
    p.next = newnode;
  }
  // 删除
  removeAt(index) {
    let p = this.getItemByNum(index - 1);
    if (p.next == null) {
      throw new Error('删除一个不存在的节点');
    }
    // 删除了链尾节点
    if (p.next == this.rear) {
      this.rear = p; // 更改p节点
    }
    p.next = p.next.next;
  }
  printf() {
    let p = this.head.next;
    let str = '';
    while (p) {
      str += `${p.data}—>`;
      p = p.next;
    }
    str += 'NULL';
    console.log(str + '    ' + '尾节点' + this.rear.data);
  }
}

/*
let p = new LinkedListR()
let arr = [3,4,1,2,6];
arr.forEach(item=>{
    p.add(item)
})
p.printf()// 3—>4—>1—>2—>6—>NULL

console.log(p.getItemByNum(2))// 4
console.log(p.getItem(6))// node:{data:6,next:null}

p.insertAt(999,2)
p.printf()// 3—>999—>4—>1—>2—>6—>NULL

p.removeAt(1)
p.printf()// 999—>4—>1—>2—>6—>NULL

p.removeAt(5)
p.printf()// 999—>4—>1—>2—>NULL
*/
module.exports = LinkedListR;
