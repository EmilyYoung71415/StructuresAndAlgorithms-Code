export function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  invertTree(root.left);
  invertTree(root.right);
  const nodeL = root.left;
  const nodeR = root.right;
  root.left = nodeR;
  root.right = nodeL;
  return root;
}
