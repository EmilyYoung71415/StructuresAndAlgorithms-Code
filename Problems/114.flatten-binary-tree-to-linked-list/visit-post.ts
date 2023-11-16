export function flatten(root: TreeNode | null): void {
  let post: TreeNode | null = null;

  const dfs = (node: TreeNode | null) => {
    if (!node) return;
    dfs(node.right);
    dfs(node.left);
    node.right = post;
    node.left = null;
    post = node;
  };

  dfs(root);
  // return post;
}
