// 迭代
// 时间复杂度：O(m*n)
// 空间复杂度：O(n) n: root 节点数
import { isSameTree } from '../100.same-tree/bfs';

export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if (!root) return false;
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const node = queue.shift()!;

    if (subRoot && node.val === subRoot.val && isSameTree(node, subRoot)) return true;

    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }

  return false;
}
