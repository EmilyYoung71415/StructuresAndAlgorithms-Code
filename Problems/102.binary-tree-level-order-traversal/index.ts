import { TreeNode } from '@utils';

// 如何区分，当前const node = queue.unshift()的那个节点是来自上一层的?
export function levelOrder(root: TreeNode | null): number[][] {
  // 注意特殊值
  if (root === null) return [];
  const dp: number[][] = [];

  const queue: TreeNode[] = [root];

  while (queue.length) {
    // --> 在每一层遍历开始前，先记录队列中的结点数量 n（也就是这一层的结点数量）
    let levelSize = queue.length;

    // 在 while 循环的每一轮中，都是将当前层的所有结点出队列，再将下一层的所有结点入队列
    const levelQueue: number[] = [];
    // 将当前层的出队好入队好后，再下一层
    while (levelSize--) {
      const node = queue.shift();

      if (node.val !== null) {
        levelQueue.push(node.val);
      }

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    dp.push(levelQueue);
  }

  return dp;
}
