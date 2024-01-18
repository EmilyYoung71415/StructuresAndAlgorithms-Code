// 使用快慢指针判断链表是否有环
// 一旦有环终究会相遇， 跳出break循环，没有环的话就会走到null节点的时候跳出
export function hasCycle(head: ListNode | null): boolean {
  let [fast, slow] = [head, head];

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }

  return false;
}
