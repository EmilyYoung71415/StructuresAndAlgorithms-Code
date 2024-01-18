function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  const queue: TreeNode[] = [root];
  let maxDepth = 0;

  while (queue.length) {
    let queueSize = queue.length;
    maxDepth++;

    while (queueSize--) {
      const node = queue.shift();

      // if (!node.left && !node.right) {
      //   return maxDepth;
      // }

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }

  // ❎： 注意++的位置
  //  maxDepth++;

  return maxDepth;
}
