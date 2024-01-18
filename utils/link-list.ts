export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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

export function buildLinkedList(arr: number[]) {
  const linkedList = new LinkedListF();
  const arr2 = arr.slice().reverse();
  arr2.forEach(data => {
    linkedList.add(data);
  });

  return linkedList.head.next;
}

export function headToArr(head: ListNode) {
  const result: number[] = [];

  let p = head;
  while (p) {
    result.push(p.val);
    p = p.next;
  }

  return result;
}

export function expectListAs(head: ListNode, target: number[]) {
  // return headToArr(head) === target;
  const arr1 = headToArr(head);
  if (arr1.length !== target.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== target[i]) return false;
  }

  return true;
}
