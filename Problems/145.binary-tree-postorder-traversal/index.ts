export function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const res: number[] = [];

  const dfs = (root: TreeNode | null) => {
    if (!root) return;

    root.left && dfs(root.left);
    root.right && dfs(root.right);
    res.push(root.val);
  };

  dfs(root);

  return res;
}
