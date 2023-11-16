// 使用后序遍历，左右根，在根的时候判断，如果左右子树里找到了则根是最近；如果left || right 那么就是在子树里
export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 如果 p 和 q 分别在 root 的左子树和右子树中，那么 root 就是最近的公共祖先
  if (left && right) return root;

  return left || right;
}
