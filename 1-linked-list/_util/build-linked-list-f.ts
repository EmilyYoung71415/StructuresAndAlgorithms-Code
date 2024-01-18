import { ListNode } from './list-node';

export class LinkedListF {
  head: ListNode;

  constructor() {
    this.head = new ListNode();
  }

  // 头插法
  add(val: number) {
    const newNode = new ListNode(val);
    newNode.next = this.head.next;
    this.head.next = newNode;
  }

  insertAt(val: number, index: number) {
    const p = this.getItemByIndex(index - 1);
    const newNode = new ListNode(val);
    newNode.next = p.next;
    p.next = newNode;
  }

  removeAt(index) {
    // 找到index前面的那个节点
    let p = this.getItemByIndex(index - 1);
    p.next = p.next.next;
  }

  getItemByIndex(index: number) {
    let i = 1;
    let p = this.head.next;

    if (index < 0) {
      throw new Error('invalid index');
    }

    if (index === 0) {
      return this.head;
    }

    while (p && i < index) {
      p = p.next;
      i++;
    }

    return p;
  }

  getItem(val: number) {
    let p = this.head.next;

    while (p && p.val !== val) {
      p = p.next;
    }

    return p;
  }

  printf(flag = false) {
    let p = this.head.next;
    const result: number[] = [];

    while (p) {
      result.push(p.val);
      p = p.next;
    }

    result.push(null);

    if (flag) {
      console.log(result);
    }

    return result;
  }
}

/*
  let p = new LinkedListF()
  let arr = [3,4,1,2,6];
  arr.forEach(item=>{
    p.add(item)
  })
  p.printf()// 6—>2—>1—>4—>3—>NULL

  console.log(p.getItemByNum(2))// 2
  console.log(p.getItem(19))//null

  p.insertAt(999,2)
  p.printf()// 6—>999—>2—>1—>4—>3—>NULL

  p.removeAt(1)
  p.printf()// 999—>2—>1—>4—>3—>NULL
*/

export function buildLinkedList(arr: number[]) {
  const linkedList = new LinkedListF();
  arr.forEach(data => {
    linkedList.add(data);
  });

  return linkedList.head;
}
