export function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) return [];

  const queue: TreeNode[] = [root];
  const dp: number[][] = [];

  while (queue.length) {
    let levelSize = queue.length;
    const levelQueue: number[] = [];

    while (levelSize--) {
      const node = queue.shift();

      node.val !== null && levelQueue.push(node.val);
      if (node.val === 3) {
        debugger;
      }

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    dp.unshift(levelQueue);
  }

  return dp;
}
