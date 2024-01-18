export function maxDepth(root: TreeNode): number {
  let maxDepth = 0;

  const dfs = (node: TreeNode, depth: number) => {
    if (!node) return;
    maxDepth = Math.max(depth, maxDepth);

    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);
  };

  dfs(root, 1);

  return maxDepth;
}

// 使用全局变量回溯优化
export function maxDepth_backtrack(root: TreeNode): number {
  let maxDepth = 0;
  let curDepth = 0;

  const dfs = (node: TreeNode) => {
    if (!node) {
      // catch
      maxDepth = Math.max(maxDepth, curDepth);
      return;
    }

    curDepth++;
    dfs(node.left);
    dfs(node.right);

    curDepth--;
  };

  dfs(root);
  return maxDepth;
}
