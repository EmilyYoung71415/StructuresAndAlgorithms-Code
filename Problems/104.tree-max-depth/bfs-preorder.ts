export function maxDepth(root: TreeNode | null): number {
  let queue: Array<[TreeNode, number]> = [[root, 1]];

  let maxDepth = 0;
  while (queue.length) {
    const next: Array<[TreeNode, number]> = [];

    for (let [node, curDepth] of queue) {
      maxDepth = Math.max(maxDepth, curDepth);
      if (node.left) next.push([node.left, curDepth + 1]);
      if (node.right) next.push([node.right, curDepth + 1]);
    }

    queue = next;
  }

  return maxDepth;
}

// 优化：全局变量
export function maxDepth_better(root: TreeNode | null): number {
  let queue: TreeNode[] = [root];

  let maxDepth = 0;

  while (queue.length) {
    const next: TreeNode[] = [];

    for (let node of queue) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }

    queue = next;
    maxDepth++;
  }

  return maxDepth;
}
