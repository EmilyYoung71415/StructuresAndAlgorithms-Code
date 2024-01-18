// 后序邻接
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
