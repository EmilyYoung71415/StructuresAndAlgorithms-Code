export function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const res: number[] = [];

  const dfs = (root: TreeNode | null) => {
    if (!root) return;

    root.left && dfs(root.left);
    res.push(root.val);
    root.right && dfs(root.right);
  };

  dfs(root);

  return res;
}
