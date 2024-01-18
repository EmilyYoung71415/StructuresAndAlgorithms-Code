function minDepth(root: TreeNode | null): number {
  if (!root) return 0;
  const queue: TreeNode[] = [root];
  let minDepth = 1;

  while (queue.length) {
    let queueSize = queue.length;

    while (queueSize--) {
      const node = queue.shift();

      if (!node.left && !node.right) {
        return minDepth;
      }

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    minDepth++;
  }

  return minDepth;
}
