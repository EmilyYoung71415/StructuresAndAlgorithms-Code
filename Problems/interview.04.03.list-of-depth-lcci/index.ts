import { TreeNode, ListNode } from '@utils';

// 每当前层遍历开始,就head = new ListNode()
// 层遍历内部, 对node.next = 同样还是prevNode
function listOfDepth(root: TreeNode | null): Array<ListNode | null> {
  const dp: Array<ListNode | null> = [];
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const levelHead = queue[0];
    let linkHead = new ListNode(levelHead.val);
    let p = linkHead;
    let levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (i > 0) {
        p.next = new ListNode(node.val);
        p = p.next;
      }

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    // p.next = null;
    dp.push(linkHead);
  }

  return dp;
}
